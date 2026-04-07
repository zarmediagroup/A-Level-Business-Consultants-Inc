import { createBrowserClient } from '@supabase/ssr'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Singleton is only safe in the browser — each browser tab has its own JS
// environment and its own cookies, so there is no cross-user contamination.
// On the server (SSR/RSC) the module is shared across ALL requests, so we
// must never cache a client there.
let browserClient: SupabaseClient | null = null

export function getSupabaseBrowser(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (!url || !key) {
    // No-op stub during build/prerender — never reaches real Supabase
    return createClient('https://placeholder.supabase.co', 'placeholder') as SupabaseClient
  }

  // Server-side (SSR): return a fresh client for each render so that one
  // user's session can never leak into another user's request.
  if (typeof window === 'undefined') {
    return createBrowserClient(url, key)
  }

  // Browser: singleton is correct — avoids duplicate GoTrue instances and
  // keeps auth state in sync across the whole SPA.
  if (!browserClient) {
    browserClient = createBrowserClient(url, key)
  }
  return browserClient
}
