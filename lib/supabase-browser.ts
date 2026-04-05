import { createBrowserClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabaseBrowser(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

    if (!url || !key) {
      // Return a no-op stub during build/prerender
      return createClient('https://placeholder.supabase.co', 'placeholder') as SupabaseClient
    }

    client = createBrowserClient(url, key)
  }
  return client
}
