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
