import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'
import {
  sendDocumentUploadAdminEmail,
  sendUploadConfirmationEmail,
  sendResubmissionAdminEmail,
} from '@/lib/email'

/** GET /api/documents — list documents for the authenticated user (client) or all (admin) */
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const isAdmin = profile?.role === 'admin'

  const sp = request.nextUrl.searchParams
  const category = sp.get('category')
  const year     = sp.get('year')
  const status   = sp.get('status')
  const clientId = sp.get('client_id')

  let query = supabase
    .from('documents')
    .select(`*, client:profiles!documents_client_id_fkey(id,full_name,email), uploader:profiles!documents_uploaded_by_fkey(id,full_name)`)
    .order('created_at', { ascending: false })

  if (!isAdmin) query = query.eq('client_id', user.id)
  if (isAdmin && clientId) query = query.eq('client_id', clientId)
  if (category) query = query.eq('category', category)
  if (year)     query = query.eq('year', Number(year))
  if (status)   query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/** POST /api/documents — upload a document */
export async function POST(request: NextRequest) {
  const supabase      = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdmin()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const formData    = await request.formData()
  const file        = formData.get('file') as File | null
  const category    = formData.get('category') as string
  const year        = Number(formData.get('year'))
  const originalId  = formData.get('original_doc_id') as string | null
  const clientId    = profile.role === 'admin'
    ? (formData.get('client_id') as string ?? user.id)
    : user.id

  if (!file || !category || !year) {
    return NextResponse.json({ error: 'file, category and year are required' }, { status: 400 })
  }

  const ext      = file.name.split('.').pop()
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const filePath = `${clientId}/${category}/${year}/${safeName}`

  const arrayBuffer = await file.arrayBuffer()
  const { error: uploadError } = await supabaseAdmin.storage
    .from('documents')
    .upload(filePath, arrayBuffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: doc, error: dbError } = await supabaseAdmin
    .from('documents')
    .insert({
      client_id:       clientId,
      uploaded_by:     user.id,
      name:            file.name,
      file_path:       filePath,
      file_type:       ext ?? file.type,
      file_size:       file.size,
      category,
      year,
      is_resubmission: !!originalId,
      original_doc_id: originalId ?? null,
    })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        originalId ? 'document.resubmit' : 'document.upload',
    resource_type: 'document',
    resource_id:   doc.id,
    metadata:      { category, year, file_name: file.name },
  })

  // In-portal notification for admin
  const { data: admins } = await supabaseAdmin
    .from('profiles').select('id').eq('role', 'admin')

  for (const admin of admins ?? []) {
    await supabaseAdmin.from('notifications').insert({
      user_id: admin.id,
      type:    originalId ? 'resubmission' : 'upload',
      title:   originalId
        ? `Resubmission from ${profile.full_name}`
        : `New upload from ${profile.full_name}`,
      body:    `${file.name} — ${category} / ${year}`,
      link:    `/portal/admin/documents`,
      metadata: { document_id: doc.id, client_id: clientId },
    })
  }

  // Emails (best-effort — don't fail the request if email fails)
  try {
    if (originalId) {
      const { data: origDoc } = await supabaseAdmin
        .from('documents').select('name').eq('id', originalId).single()
      await sendResubmissionAdminEmail({
        clientName:       profile.full_name,
        clientEmail:      profile.email,
        fileName:         file.name,
        originalFileName: origDoc?.name ?? '',
      })
    } else {
      await Promise.all([
        sendDocumentUploadAdminEmail({
          clientName:  profile.full_name,
          clientEmail: profile.email,
          category,
          year,
          fileName:    file.name,
          documentId:  doc.id,
        }),
        sendUploadConfirmationEmail({
          clientEmail: profile.email,
          clientName:  profile.full_name,
          category,
          year,
          fileName:    file.name,
        }),
      ])
    }
  } catch (_) {
    // swallow email errors
  }

  return NextResponse.json(doc, { status: 201 })
}
