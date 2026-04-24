import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/** Vercel/UI paste can add stray spaces or newlines around secrets and break JWT parsing. */
function envTrim(name: string): string {
  const v = process.env[name]
  return typeof v === 'string' ? v.trim() : ''
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    envTrim('NEXT_PUBLIC_SUPABASE_URL'),
    envTrim('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookies can only be set in middleware/route handlers
          }
        },
      },
    }
  )
}

/** Service-role client — bypasses RLS. Use only in trusted server-side code. */
export function createSupabaseAdmin() {
  const { createClient } = require('@supabase/supabase-js')
  return createClient(
    envTrim('NEXT_PUBLIC_SUPABASE_URL'),
    envTrim('SUPABASE_SERVICE_ROLE_KEY'),
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
