import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'

async function requireAdmin(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (p?.role !== 'admin') return null
  return user
}

/** GET /api/admin/clients/[id] — full client profile with documents */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const user = await requireAdmin(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabaseAdmin = createSupabaseAdmin()
  const { data: profile } = await supabaseAdmin.from('profiles').select('*').eq('id', id).single()
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: documents } = await supabaseAdmin
    .from('documents')
    .select('*, uploader:profiles!documents_uploaded_by_fkey(id, full_name)')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  const { data: notes } = await supabaseAdmin
    .from('client_notes')
    .select('*, author:profiles!client_notes_created_by_fkey(id, full_name)')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  return NextResponse.json({ profile, documents: documents ?? [], notes: notes ?? [] })
}

/** PUT /api/admin/clients/[id] — update client profile */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const user = await requireAdmin(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { full_name, phone, company, service_category } = body

  const supabaseAdmin = createSupabaseAdmin()
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ full_name, phone, company, service_category, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'client.update',
    resource_type: 'profile',
    resource_id:   id,
    metadata:      { full_name },
  })

  return NextResponse.json({ success: true })
}

/** DELETE /api/admin/clients/[id] — deactivate/delete client */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const user = await requireAdmin(supabase)
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabaseAdmin = createSupabaseAdmin()
  const { data: profile } = await supabaseAdmin.from('profiles').select('email').eq('id', id).single()

  const { error } = await supabaseAdmin.auth.admin.deleteUser(id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'client.delete',
    resource_type: 'profile',
    resource_id:   id,
    metadata:      { email: profile?.email },
  })

  return NextResponse.json({ success: true })
}
