import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'
import { sendCommentNotificationEmail } from '@/lib/email'

/** GET /api/documents/[id]/comments */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('document_comments')
    .select('*, author:profiles(id, full_name, role)')
    .eq('document_id', id)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

/** POST /api/documents/[id]/comments — admin posts a comment */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase      = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdmin()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { content }: { content: string } = await request.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })

  const { data: comment, error } = await supabaseAdmin
    .from('document_comments')
    .insert({ document_id: id, author_id: user.id, content: content.trim() })
    .select('*, author:profiles(id, full_name, role)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Fetch doc + client
  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('name, client_id, status')
    .eq('id', id)
    .single()

  if (doc) {
    // Mark doc as Requires Action if not already
    if (doc.status !== 'Requires Action') {
      await supabaseAdmin
        .from('documents')
        .update({ status: 'Requires Action', updated_at: new Date().toISOString() })
        .eq('id', id)
    }

    // In-portal notification
    await supabaseAdmin.from('notifications').insert({
      user_id: doc.client_id,
      type:    'comment',
      title:   'Your accountant left a comment',
      body:    `${doc.name}: "${content.trim().slice(0, 80)}${content.length > 80 ? '…' : ''}"`,
      link:    '/portal/documents',
      metadata: { document_id: id },
    })

    // Audit
    await supabaseAdmin.from('audit_log').insert({
      actor_id:      user.id,
      actor_email:   user.email,
      action:        'comment.create',
      resource_type: 'document',
      resource_id:   id,
      metadata:      { comment_id: comment.id },
    })

    // Email
    try {
      const { data: clientProfile } = await supabaseAdmin
        .from('profiles').select('email, full_name').eq('id', doc.client_id).single()
      if (clientProfile) {
        await sendCommentNotificationEmail({
          clientEmail: clientProfile.email,
          clientName:  clientProfile.full_name,
          fileName:    doc.name,
          comment:     content.trim(),
          documentId:  id,
        })
      }
    } catch (_) {}
  }

  return NextResponse.json(comment, { status: 201 })
}
