'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
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
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) { setError(updateError.message); return }
    setDone(true)
    setTimeout(() => router.push('/portal'), 2000)
  }

  const inputClass = 'w-full h-12 px-4 font-sans text-sm rounded-[1px] border text-white placeholder-faint focus:outline-none focus:border-white transition-colors duration-200'

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: 'var(--ink)' }}>
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

        <div className="rounded-[1px] p-8" style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}>
          {done ? (
            <div>
              <h1 className="font-playfair text-white text-2xl mb-4">
                {isFirstTime ? 'Welcome Aboard' : 'Password Updated'}
              </h1>
              <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                {isFirstTime
                  ? 'Your account is active. Redirecting you to the portal…'
                  : 'Your password has been updated. Redirecting you to the portal…'}
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-playfair text-white text-2xl mb-3">
                {isFirstTime ? 'Welcome — Set Your Password' : 'Set New Password'}
              </h1>
              {isFirstTime && (
                <p className="font-sans text-sm mb-6" style={{ color: 'var(--muted)' }}>
                  Your email has been verified. Choose a password to activate your account.
                </p>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="new-password" className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={inputClass}
                    style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--graphite)' }}
                    required minLength={8}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
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
                  {loading ? 'Saving…' : isFirstTime ? 'Activate Account' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
