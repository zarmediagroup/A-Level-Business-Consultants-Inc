import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'
import { sendInvitationEmail } from '@/lib/email'

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

/** POST /api/admin/clients — invite a new client via email */
export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { email, full_name, phone, company, service_category } = body

  if (!email || !full_name) {
    return NextResponse.json({ error: 'email and full_name are required' }, { status: 400 })
  }

  const supabaseAdmin = createSupabaseAdmin()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  // Generate the invite link without sending via Supabase (avoids their rate limit).
  // We send the email ourselves through our own SMTP.
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email,
    options: {
      redirectTo: `${appUrl}/api/auth/callback?next=/reset-password`,
      data: { full_name, role: 'client' },
    },
  })

  if (linkError) return NextResponse.json({ error: linkError.message }, { status: 400 })

  const authData = linkData

  await sendInvitationEmail({
    clientEmail: email,
    clientName:  full_name,
    inviteUrl:   linkData.properties.action_link,
  })

  // Upsert profile with extra fields (trigger auto-creates id/email/full_name/role)
  await supabaseAdmin.from('profiles').upsert({
    id:               authData.user.id,
    email,
    full_name,
    role:             'client',
    phone:            phone || null,
    company:          company || null,
    service_category: service_category || null,
  })

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'client.create',
    resource_type: 'profile',
    resource_id:   authData.user.id,
    metadata:      { email, full_name, invited: true },
  })

  return NextResponse.json({ id: authData.user.id }, { status: 201 })
}
