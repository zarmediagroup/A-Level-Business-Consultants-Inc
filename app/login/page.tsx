'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') ?? '/portal'
  const supabase     = getSupabaseBrowser()

  const [email,   setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [mode,    setMode]    = useState<'login' | 'forgot'>('login')
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

    router.push(redirect)
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

  const inputClass = 'w-full h-12 px-4 font-sans text-sm rounded-[1px] border text-white placeholder-faint focus:outline-none focus:border-white transition-colors duration-200'

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: 'var(--ink)' }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-center items-center lg:w-[55%] p-16 relative"
        style={{ backgroundColor: 'var(--ink)', borderRight: '1px solid var(--rule)' }}
      >
        <div className="max-w-lg w-full">
          <div
            className="font-playfair leading-none mb-4 select-none"
            style={{ fontSize: '8rem', color: 'var(--rule)', lineHeight: 1 }}
            aria-hidden="true"
          >
            "
          </div>
          <blockquote
            className="font-playfair italic leading-[1.7]"
            style={{ fontSize: '1.5rem', color: 'var(--off-white)' }}
          >
            Your financial records are only as good as the people who maintain them.
          </blockquote>
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mt-8" style={{ color: 'var(--faint)' }}>
            Adrian Quina CA(SA) · A Level Business Consultants Inc
          </p>
          <div className="flex flex-wrap gap-2 mt-12">
            {['SAICA Registered', 'IRBA Approved', 'POPIA Compliant'].map(badge => (
              <span
                key={badge}
                className="font-mono text-[0.62rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px]"
                style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
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
        style={{ backgroundColor: 'var(--obsidian)' }}
      >
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="flex items-center justify-center border rounded-[1px] font-mono text-[0.6rem] tracking-[0.18em] uppercase"
              style={{ width: '36px', height: '32px', borderColor: 'var(--rule-mid)', color: 'var(--white)' }}
            >
              ALC
            </div>
            <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: 'var(--muted)' }}>
              A Level Business Consultants
            </span>
          </div>

          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-8" style={{ color: 'var(--muted)' }}>
            Client Portal
          </p>

          <div
            className="rounded-[1px] p-8"
            style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
          >
            {mode === 'login' ? (
              <>
                <h1 className="font-playfair text-white text-2xl mb-8">Sign In</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="email" className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={inputClass}
                      style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--graphite)' }}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className={inputClass}
                      style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--graphite)' }}
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-[0.65rem] tracking-[0.08em]" style={{ color: 'var(--loss)' }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError('') }}
                      className="font-sans text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--muted)' }}
                    >
                      Forgot password?
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="font-playfair text-white text-2xl mb-3">Reset Password</h1>
                {forgotSent ? (
                  <div>
                    <p className="font-sans text-sm mb-6" style={{ color: 'var(--muted)' }}>
                      If an account exists for <strong className="text-white">{email}</strong>, a password reset link has been sent.
                    </p>
                    <button
                      onClick={() => { setMode('login'); setForgotSent(false) }}
                      className="font-sans text-sm transition-colors hover:text-white"
                      style={{ color: 'var(--muted)' }}
                    >
                      ← Back to sign in
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="flex flex-col gap-5 mt-6">
                    <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                      Enter your email address and we&apos;ll send you a reset link.
                    </p>
                    <div>
                      <label htmlFor="reset-email" className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                        Email Address
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={inputClass}
                        style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--graphite)' }}
                        required
                      />
                    </div>

                    {error && (
                      <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setMode('login'); setError('') }}
                      className="font-sans text-sm transition-colors hover:text-white"
                      style={{ color: 'var(--muted)' }}
                    >
                      ← Back to sign in
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <p className="font-mono text-[0.65rem] tracking-[0.08em] text-center mt-6" style={{ color: 'var(--faint)' }}>
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
