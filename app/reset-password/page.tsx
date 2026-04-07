'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function ResetPasswordPage() {
  const router   = useRouter()
  const supabase = getSupabaseBrowser()
  const [isFirstTime, setIsFirstTime] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      const createdAt = user.created_at
      const lastSignIn = user.last_sign_in_at
      // No prior sign-in or sign-in is the same as creation → first time (invite)
      setIsFirstTime(!lastSignIn || lastSignIn === createdAt)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [done,      setDone]      = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    setError('')

    // Verify a valid session exists before attempting the update.
    // This guards against the edge-case where the invite token was not
    // properly exchanged and we would be operating on the wrong user.
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      setLoading(false)
      setError('Your session has expired or is invalid. Please use the invite link from your email again.')
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) { setError(updateError.message); return }
    setDone(true)
    setTimeout(() => router.push('/portal'), 2000)
  }

  const fieldStyle: CSSProperties = {
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
  }

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-ibm-mono)',
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'var(--white)',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="flex items-center justify-center font-mono text-[0.6rem] tracking-[0.18em] uppercase font-bold"
            style={{ width: '40px', height: '36px', backgroundColor: 'var(--accent)', color: '#0A0A08', border: '2px solid #0A0A08' }}
          >
            ALC
          </div>
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase font-bold" style={{ color: 'var(--white)' }}>
            A Level Business Consultants
          </span>
        </div>

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
              {done
                ? (isFirstTime ? 'Welcome Aboard' : 'Password Updated')
                : (isFirstTime ? 'Set Your Password' : 'Set New Password')}
            </h1>
          </div>

          <div className="p-8">
            {done ? (
              <div>
                <div
                  className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold px-3 py-1.5 mb-4"
                  style={{ backgroundColor: 'var(--profit)', color: '#0A0A08', border: '2px solid #0A0A08' }}
                >
                  ✓ Success
                </div>
                <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                  {isFirstTime
                    ? 'Your account is active. Redirecting you to the portal…'
                    : 'Your password has been updated. Redirecting you to the portal…'}
                </p>
              </div>
            ) : (
              <>
                {isFirstTime && (
                  <p className="font-sans text-sm mb-6 font-medium" style={{ color: 'var(--muted)' }}>
                    Your email has been verified. Choose a password to activate your account.
                  </p>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="new-password" style={labelStyle}>New Password</label>
                    <input
                      id="new-password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={fieldStyle}
                      required
                      minLength={8}
                      onFocus={e => (e.currentTarget.style.boxShadow = 'var(--neo-shadow-sm)')}
                      onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
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
                    className="w-full h-12 neo-btn-primary font-sans text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving…' : isFirstTime ? 'Activate Account →' : 'Update Password →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
