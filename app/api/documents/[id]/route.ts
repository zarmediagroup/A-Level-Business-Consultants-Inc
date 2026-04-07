import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'

/** GET /api/documents/[id] — get signed download URL */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: doc } = await supabase
    .from('documents')
    .select('file_path, client_id, name')
    .eq('id', id)
    .single()

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && doc.client_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: signed } = await supabase.storage
    .from('documents')
    .createSignedUrl(doc.file_path, 300) // 5 minutes

  return NextResponse.json({ url: signed?.signedUrl, name: doc.name })
}

/** PATCH /api/documents/[id] — client edits own document (metadata + optional file replacement) */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase      = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdmin()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: doc } = await supabase
    .from('documents')
    .select('client_id, file_path, name, category, year')
    .eq('id', id)
    .single()

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (doc.client_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const formData = await request.formData()
  const name     = formData.get('name')     as string | null
  const category = formData.get('category') as string | null
  const year     = formData.get('year')     ? Number(formData.get('year')) : null
  const file     = formData.get('file')     as File | null

  const updates: Record<string, unknown> = {
    status:     'Received',
    updated_at: new Date().toISOString(),
  }
  if (name?.trim())  updates.name     = name.trim()
  if (category)      updates.category = category
  if (year)          updates.year     = year

  if (file && file.size > 0) {
    const newCategory = (category ?? doc.category) as string
    const newYear     = year ?? doc.year
    const safeName    = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const filePath    = `${user.id}/${newCategory}/${newYear}/${safeName}`

    const arrayBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabaseAdmin.storage
      .from('documents')
      .upload(filePath, arrayBuffer, { contentType: file.type, upsert: false })

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

    // Remove the old file from storage
    await supabaseAdmin.storage.from('documents').remove([doc.file_path])

    const ext = file.name.split('.').pop()
    updates.file_path = filePath
    updates.file_type = ext ?? file.type
    updates.file_size = file.size
    if (!name?.trim()) updates.name = file.name // default name to new file name if not provided
  }

  const { data: updated, error: dbError } = await supabaseAdmin
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'document.edit',
    resource_type: 'document',
    resource_id:   id,
    metadata:      { changed_fields: Object.keys(updates).filter(k => !['updated_at', 'status'].includes(k)) },
  })

  // Notify all admins
  const { data: admins } = await supabaseAdmin.from('profiles').select('id').eq('role', 'admin')
  for (const admin of admins ?? []) {
    await supabaseAdmin.from('notifications').insert({
      user_id:  admin.id,
      type:     'document_edited',
      title:    'Client edited a document',
      body:     `${updated.name} has been updated and resubmitted for review`,
      link:     '/portal/admin/documents',
      metadata: { document_id: id },
    })
  }

  return NextResponse.json(updated)
}

/** DELETE /api/documents/[id] — admin only */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase      = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdmin()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: doc } = await supabaseAdmin
    .from('documents').select('file_path, name').eq('id', id).single()

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabaseAdmin.storage.from('documents').remove([doc.file_path])
  await supabaseAdmin.from('documents').delete().eq('id', id)

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'document.delete',
    resource_type: 'document',
    resource_id:   id,
    metadata:      { file_name: doc.name },
  })

  return NextResponse.json({ success: true })
}
