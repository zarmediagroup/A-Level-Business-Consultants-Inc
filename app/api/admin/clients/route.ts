import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'

/** GET /api/admin/clients — list all client profiles */
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const sp = request.nextUrl.searchParams
  const search = sp.get('search') ?? ''

  const supabaseAdmin = createSupabaseAdmin()
  let query = supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('full_name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Attach document counts
  const withCounts = await Promise.all(
    (data ?? []).map(async (profile: { id: string }) => {
      const { count } = await supabaseAdmin
        .from('documents')
        .select('id', { count: 'exact', head: true })
        .eq('client_id', profile.id)
      return { ...profile, document_count: count ?? 0 }
    })
  )

  return NextResponse.json(withCounts)
}

/** POST /api/admin/clients — create a new client account */
export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { email, full_name, password, phone, company, service_category } = body

  if (!email || !full_name || !password) {
    return NextResponse.json({ error: 'email, full_name and password are required' }, { status: 400 })
  }

  const supabaseAdmin = createSupabaseAdmin()

  // Create auth user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role: 'client' },
  })

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  // Upsert profile (trigger should auto-create, but ensure fields are set)
  await supabaseAdmin.from('profiles').upsert({
    id:               authData.user.id,
    email,
    full_name,
    role:             'client',
    phone,
    company,
    service_category,
  })

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'client.create',
    resource_type: 'profile',
    resource_id:   authData.user.id,
    metadata:      { email, full_name },
  })

  return NextResponse.json({ id: authData.user.id }, { status: 201 })
}
