'use client'

import { useState, useEffect } from 'react'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { useAuth } from '@/contexts/AuthContext'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function SettingsPage() {
  const { profile, user } = useAuth()
  const supabase = getSupabaseBrowser()

  const [fullName, setFullName] = useState('')
  const [phone,    setPhone]    = useState('')
  const [company,  setCompany]  = useState('')
  const [saving,   setSaving]   = useState(false)
  const [saved,    setSaved]    = useState(false)
  const [error,    setError]    = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPw,   setConfirmPw]   = useState('')
  const [pwSaving,    setPwSaving]    = useState(false)
  const [pwError,     setPwError]     = useState('')
  const [pwSaved,     setPwSaved]     = useState(false)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name)
      setPhone(profile.phone ?? '')
      setCompany(profile.company ?? '')
    }
  }, [profile])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true); setError(''); setSaved(false)

    const res = await fetch(`/api/admin/clients/${user.id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ full_name: fullName, phone, company }),
    })

    // For clients: update via Supabase directly (non-admin route)
    if (!res.ok) {
      const { error: sb } = await supabase
        .from('profiles')
        .update({ full_name: fullName, phone, company, updated_at: new Date().toISOString() })
        .eq('id', user.id)
      if (sb) { setError(sb.message); setSaving(false); return }
    }

    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPw) { setPwError('Passwords do not match.'); return }
    if (newPassword.length < 8)    { setPwError('Minimum 8 characters.'); return }
    setPwSaving(true); setPwError(''); setPwSaved(false)

    const { error: upErr } = await supabase.auth.updateUser({ password: newPassword })
    setPwSaving(false)
    if (upErr) { setPwError(upErr.message); return }
    setPwSaved(true); setNewPassword(''); setConfirmPw('')
    setTimeout(() => setPwSaved(false), 3000)
  }

  const inputClass = 'w-full h-12 px-4 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors'

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      {/* Profile */}
      <DashboardWidget label="Account Settings">
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase mb-5" style={{ color: 'var(--faint)' }}>
              Profile
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                  Full Name
                </label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} className={inputClass} required />
              </div>
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                  Email Address
                </label>
                <input value={user?.email ?? ''} disabled className={inputClass} style={{ opacity: 0.5, cursor: 'not-allowed' }} />
              </div>
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                  Phone
                </label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                  Company
                </label>
                <input value={company} onChange={e => setCompany(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {error  && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{error}</p>}
          {saved  && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--profit)' }}>Profile saved.</p>}

          <div>
            <button
              type="submit"
              disabled={saving}
              className="h-12 px-8 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </DashboardWidget>

      {/* Password */}
      <DashboardWidget label="Change Password">
        <form onSubmit={handleChangePassword} className="flex flex-col gap-4 max-w-sm">
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              New Password
            </label>
            <input
              type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
              className={inputClass} minLength={8} required
            />
          </div>
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              Confirm Password
            </label>
            <input
              type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
              className={inputClass} required
            />
          </div>

          {pwError && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{pwError}</p>}
          {pwSaved && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--profit)' }}>Password updated.</p>}

          <button
            type="submit"
            disabled={pwSaving}
            className="h-12 px-8 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
          >
            {pwSaving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </DashboardWidget>

      {/* Security info */}
      <div className="px-1">
        <p className="font-mono text-[0.65rem] tracking-[0.08em]" style={{ color: 'var(--faint)' }}>
          256-bit encrypted · POPIA compliant · SAICA professional standards
        </p>
      </div>
    </div>
  )
}
