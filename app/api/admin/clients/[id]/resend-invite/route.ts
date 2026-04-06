import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'
import { sendInvitationEmail } from '@/lib/email'

/** POST /api/admin/clients/[id]/resend-invite — resend the invitation email to a pending client */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabaseAdmin = createSupabaseAdmin()
  const { data: profile } = await supabaseAdmin.from('profiles').select('email, full_name, last_login').eq('id', id).single()

  if (!profile) return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  if (profile.last_login) return NextResponse.json({ error: 'Client has already accepted their invitation' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email: profile.email,
    options: {
      redirectTo: `${appUrl}/api/auth/callback?next=/reset-password`,
      data: { full_name: profile.full_name, role: 'client' },
    },
  })

  if (linkError) return NextResponse.json({ error: linkError.message }, { status: 400 })

  await sendInvitationEmail({
    clientEmail: profile.email,
    clientName:  profile.full_name,
    inviteUrl:   linkData.properties.action_link,
  })

  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'client.invite_resent',
    resource_type: 'profile',
    resource_id:   id,
    metadata:      { email: profile.email },
  })

  return NextResponse.json({ success: true })
}
