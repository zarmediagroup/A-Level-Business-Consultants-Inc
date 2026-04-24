import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function envTrim(name: string): string {
  const v = process.env[name]
  return typeof v === 'string' ? v.trim() : ''
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    envTrim('NEXT_PUBLIC_SUPABASE_URL'),
    envTrim('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Helper: build a redirect that carries any cookie mutations Supabase wrote
  // (e.g. clearing a stale refresh token). Without this, Set-Cookie headers
  // on supabaseResponse are dropped whenever we redirect.
  function redirect(url: URL) {
    const res = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(cookie =>
      res.cookies.set(cookie.name, cookie.value, cookie as Parameters<typeof res.cookies.set>[2])
    )
    return res
  }

  // Refresh session — must NOT call supabase.auth.getSession() here
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect all /portal routes
  if (pathname.startsWith('/portal')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return redirect(url)
    }

    // Protect admin sub-routes
    if (pathname.startsWith('/portal/admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/portal'
        return redirect(url)
      }
    }
  }

  // Redirect already-authenticated users away from login
  if (pathname === '/login' && user) {
    const redirectParam = request.nextUrl.searchParams.get('redirect')
    if (redirectParam) {
      const url = request.nextUrl.clone()
      url.pathname = redirectParam
      url.searchParams.delete('redirect')
      return redirect(url)
    }

    // No explicit redirect — send admins to admin portal, others to client portal
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    url.pathname = profile?.role === 'admin' ? '/portal/admin' : '/portal'
    return redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/portal/:path*', '/login'],
}
