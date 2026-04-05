'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('demo@alevelconsultants.co.za')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    if (email && password) {
      router.push('/portal')
    } else {
      setError('Please enter your credentials.')
      setLoading(false)
    }
  }

  const inputClass =
    'w-full h-12 px-4 font-sans text-sm rounded-[1px] border text-white placeholder-faint focus:outline-none focus:border-white transition-colors duration-200'

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: 'var(--ink)' }}>

      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-center items-center lg:w-[55%] p-16 relative"
        style={{ backgroundColor: 'var(--ink)', borderRight: '1px solid var(--rule)' }}
      >
        <div className="max-w-lg w-full">
          {/* Decorative quote mark */}
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

      {/* Right Panel */}
      <div
        className="flex-1 lg:w-[45%] flex flex-col justify-center items-center p-8 lg:p-16"
        style={{ backgroundColor: 'var(--obsidian)' }}
      >
        <div className="w-full max-w-[400px]">
          {/* Logo */}
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
            <h1 className="font-playfair text-white text-2xl mb-8">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  className="font-sans text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--muted)' }}
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </div>

          <p className="font-mono text-[0.65rem] tracking-[0.08em] text-center mt-6" style={{ color: 'var(--faint)' }}>
            🔒 256-bit encrypted · POPIA compliant · SAICA professional standards
          </p>
        </div>
      </div>
    </div>
  )
}
