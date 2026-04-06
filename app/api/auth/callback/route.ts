import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/portal'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    // If this is a first-time invite acceptance, always go to set-password
    if (!error && data.session) {
      const isInvite = !data.session.user.last_sign_in_at ||
        data.session.user.last_sign_in_at === data.session.user.created_at
      if (isInvite && next !== '/reset-password') {
        return NextResponse.redirect(`${origin}/reset-password`)
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
