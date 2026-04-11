'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import Link from 'next/link'
import { BrandLogo } from '@/components/branding/BrandLogo'
import { defaultTenant } from '@/types/tenant'

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function LoginForm() {
  const tenant       = defaultTenant
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') ?? '/portal'
  const supabase     = getSupabaseBrowser()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [mode,     setMode]     = useState<'login' | 'forgot'>('login')
  const [forgotSent, setForgotSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Incorrect email or password.'
        : authError.message)
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      if (profile?.role === 'admin') {
        router.push('/portal/admin')
      } else {
        router.push(redirect)
      }
    } else {
      router.push(redirect)
    }
    router.refresh()
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)
    if (resetError) { setError(resetError.message); return }
    setForgotSent(true)
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    height: '48px',
    padding: '0 1rem',
    fontFamily: 'var(--font-dm-sans)',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: '2px solid var(--white)',
    backgroundColor: 'var(--ink)',
    color: 'var(--white)',
    outline: 'none',
    transition: 'box-shadow 80ms ease',
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-center items-center lg:w-[55%] p-16 relative"
        style={{
          backgroundColor: 'var(--obsidian)',
          borderRight: '2px solid var(--white)',
        }}
      >
        {/* Accent block decoration */}
        <div
          className="absolute top-0 left-0"
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'var(--accent)',
            borderBottom: '2px solid var(--white)',
            borderRight: '2px solid var(--white)',
          }}
        >
          <Link href="/" className="absolute inset-0 flex items-start justify-start p-5" aria-label="Back to website">
            <ArrowLeftIcon className="w-5 h-5 shrink-0 text-[var(--accent-fg)]" />
          </Link>
        </div>

        <div className="max-w-lg w-full">
          <div
            className="font-bebas leading-none mb-6 select-none"
            style={{ fontSize: '6rem', color: 'var(--accent)', lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote
            className="font-sans font-medium leading-[1.75]"
            style={{ fontSize: '1.25rem', color: 'var(--off-white)' }}
          >
            Your financial records are only as good as the people who maintain them.
          </blockquote>
          <div
            className="mt-2 h-[3px] w-16"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <p
            className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mt-6 font-bold"
            style={{ color: 'var(--faint)' }}
          >
            Adrian Quina CA(SA) · {tenant.firm_name}
          </p>
          <div className="flex flex-wrap gap-2 mt-10">
            {['SAICA Registered', 'IRBA Approved', 'POPIA Compliant'].map(badge => (
              <span
                key={badge}
                className="font-mono text-[0.62rem] tracking-[0.1em] uppercase px-2.5 py-1 font-bold"
                style={{
                  border: '2px solid var(--white)',
                  color: 'var(--white)',
                  backgroundColor: 'var(--carbon)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex-1 lg:w-[45%] flex flex-col justify-center items-center p-8 lg:p-16"
        style={{ backgroundColor: 'var(--ink)' }}
      >
        <div className="w-full max-w-[400px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold mb-8 transition-colors hover:text-[var(--accent)]"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeftIcon className="w-4 h-4 shrink-0" />
            Back to website
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <BrandLogo size={48} className="shrink-0" />
            <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--white)' }}>
              {tenant.firm_name}
            </span>
          </div>

          <span
            className="inline-block font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-8 font-bold px-3 py-1.5"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-fg)',
              border: '2px solid #0A0A08',
            }}
          >
            Client Portal
          </span>

          {/* Card */}
          <div
            style={{
              backgroundColor: 'var(--carbon)',
              border: '2px solid var(--white)',
              boxShadow: 'var(--neo-shadow)',
            }}
          >
            {/* Card header */}
            <div
              className="px-8 py-4"
              style={{ borderBottom: '2px solid var(--white)', backgroundColor: 'var(--graphite)' }}
            >
              <h1
                className="font-bebas"
                style={{ fontSize: '1.75rem', color: 'var(--white)', letterSpacing: '0.04em' }}
              >
                {mode === 'login' ? 'Sign In' : 'Reset Password'}
              </h1>
            </div>

            <div className="p-8">
              {mode === 'login' ? (
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold mb-2"
                      style={{ color: 'var(--white)' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={fieldStyle}
                      required
                      autoComplete="email"
                      placeholder="you@company.co.za"
                      onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold mb-2"
                      style={{ color: 'var(--white)' }}
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={fieldStyle}
                      required
                      autoComplete="current-password"
                      onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-[0.7rem] tracking-[0.06em] font-bold" style={{ color: 'var(--loss)' }}>
                      ✕ {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 neo-btn-primary font-sans text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In →'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError('') }}
                      className="font-mono text-[0.65rem] tracking-[0.1em] uppercase font-bold transition-colors duration-100 hover:text-[var(--accent)] underline underline-offset-4"
                      style={{ color: 'var(--muted)' }}
                    >
                      Forgot password?
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {forgotSent ? (
                    <div>
                      <p className="font-sans text-sm font-medium mb-6" style={{ color: 'var(--muted)' }}>
                        If an account exists for{' '}
                        <strong className="font-bold" style={{ color: 'var(--accent)' }}>{email}</strong>,
                        a password reset link has been sent.
                      </p>
                      <button
                        onClick={() => { setMode('login'); setForgotSent(false) }}
                        className="font-mono text-[0.65rem] tracking-[0.1em] uppercase font-bold transition-colors hover:text-[var(--accent)]"
                        style={{ color: 'var(--muted)' }}
                      >
                        ← Back to sign in
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgot} className="flex flex-col gap-5">
                      <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                        Enter your email and we&apos;ll send you a reset link.
                      </p>
                      <div>
                        <label
                          htmlFor="reset-email"
                          className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold mb-2"
                          style={{ color: 'var(--white)' }}
                        >
                          Email Address
                        </label>
                        <input
                          id="reset-email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          style={fieldStyle}
                          required
                          onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                          onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                        />
                      </div>

                      {error && (
                        <p className="font-mono text-[0.7rem] font-bold" style={{ color: 'var(--loss)' }}>
                          ✕ {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 neo-btn-primary font-sans text-sm disabled:opacity-60"
                      >
                        {loading ? 'Sending...' : 'Send Reset Link →'}
                      </button>

                      <button
                        type="button"
                        onClick={() => { setMode('login'); setError('') }}
                        className="font-mono text-[0.65rem] tracking-[0.1em] uppercase font-bold transition-colors hover:text-[var(--accent)]"
                        style={{ color: 'var(--muted)' }}
                      >
                        ← Back to sign in
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>

          <p className="font-mono text-[0.6rem] tracking-[0.08em] text-center mt-6 font-bold" style={{ color: 'var(--faint)' }}>
            256-bit encrypted · POPIA compliant · SAICA professional standards
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
