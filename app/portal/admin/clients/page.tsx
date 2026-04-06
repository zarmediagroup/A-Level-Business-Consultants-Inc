'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import type { Profile } from '@/types/database'

interface ClientWithCount extends Profile { document_count: number }

export default function AdminClientsPage() {
  const [clients,  setClients]  = useState<ClientWithCount[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving,      setSaving]      = useState(false)
  const [formError,   setFormError]   = useState('')
  const [inviteSent,  setInviteSent]  = useState('')
  const [resending,   setResending]   = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: '', email: '',
    phone: '', company: '', service_category: '',
  })

  const load = useCallback(async () => {
    setLoading(true)
    const params = search ? `?search=${encodeURIComponent(search)}` : ''
    const res = await fetch(`/api/admin/clients${params}`)
    if (res.ok) setClients(await res.json())
    setLoading(false)
  }, [search])

  useEffect(() => { load() }, [load])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setFormError('')
    const res = await fetch('/api/admin/clients', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) { const j = await res.json(); setFormError(j.error); return }
    const sentTo = form.email
    setShowForm(false)
    setForm({ full_name: '', email: '', phone: '', company: '', service_category: '' })
    setInviteSent(sentTo)
    load()
  }

  async function handleResendInvite(id: string) {
    setResending(id)
    const res = await fetch(`/api/admin/clients/${id}/resend-invite`, { method: 'POST' })
    setResending(null)
    if (!res.ok) { const j = await res.json(); alert(j.error); return }
    alert('Invitation resent.')
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' })
    if (res.ok) { setDeleteId(null); load() }
    else alert('Delete failed.')
  }

  const inputClass = 'w-full h-10 px-3 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors'

  return (
    <div>
      <DashboardWidget
        label="Client Management"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          >
            + New Client
          </button>
        }
      >
        {/* Invite sent banner */}
        {inviteSent && (
          <div
            className="flex items-center justify-between mb-5 px-4 py-3 rounded-[1px] font-mono text-[0.72rem]"
            style={{ backgroundColor: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)', color: '#4ade80' }}
          >
            <span>Invitation sent to <strong>{inviteSent}</strong></span>
            <button onClick={() => setInviteSent('')} className="ml-4 opacity-60 hover:opacity-100">×</button>
          </div>
        )}

        {/* Search */}
        <div className="mb-5">
          <input
            type="search"
            placeholder="Search clients by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 px-4 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white placeholder-faint focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {loading ? (
          <p className="font-mono text-[0.75rem] py-8 text-center" style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                  {['Name', 'Email', 'Company', 'Service', 'Documents', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-4" style={{ color: 'var(--faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--rule)' }} className="group">
                    <td className="py-3 pr-4">
                      <span className="font-sans text-sm text-white">{c.full_name}</span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{c.email}</td>
                    <td className="py-3 pr-4 font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.company ?? '—'}</td>
                    <td className="py-3 pr-4 font-sans text-sm" style={{ color: 'var(--muted)' }}>{c.service_category ?? '—'}</td>
                    <td className="py-3 pr-4 font-mono text-sm text-white">{c.document_count}</td>
                    <td className="py-3 pr-4">
                      {c.last_login ? (
                        <span className="font-mono text-[0.72rem]" style={{ color: 'var(--faint)' }}>
                          {new Date(c.last_login).toLocaleDateString('en-ZA')}
                        </span>
                      ) : (
                        <span
                          className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-[1px]"
                          style={{ backgroundColor: 'rgba(217,119,6,0.15)', color: '#fbbf24', border: '1px solid rgba(217,119,6,0.3)' }}
                        >
                          Invited
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/portal/admin/clients/${c.id}`}
                          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                        >
                          View
                        </Link>
                        {!c.last_login && (
                          <button
                            onClick={() => handleResendInvite(c.id)}
                            disabled={resending === c.id}
                            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white disabled:opacity-40"
                            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                          >
                            {resending === c.id ? '…' : 'Resend'}
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteId(c.id)}
                          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--loss)' }}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr><td colSpan={7} className="py-10 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>No clients found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </DashboardWidget>

      {/* Create Client Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-lg rounded-[1px] p-8" style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-playfair text-white text-xl">Invite Client</h2>
              <button onClick={() => setShowForm(false)} className="font-mono text-xl text-white">×</button>
            </div>
            <p className="font-sans text-sm mb-6" style={{ color: 'var(--muted)' }}>
              An invitation email will be sent. The client clicks the link to verify their email and set their own password.
            </p>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>Full Name *</label>
                  <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} className={inputClass} required />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} required />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>Phone</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>Company</label>
                  <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="font-mono text-[0.65rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>Service Category</label>
                  <select value={form.service_category} onChange={e => setForm(f => ({ ...f, service_category: e.target.value }))} className={inputClass + ' cursor-pointer'} style={{ height: '40px' }}>
                    <option value="">Select...</option>
                    {['Accounting', 'Audit', 'Tax Compliance', 'Bookkeeping', 'Company Secretarial', 'Payroll', 'VAT'].map(s => (
                      <option key={s} value={s} style={{ backgroundColor: 'var(--carbon)' }}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formError && <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{formError}</p>}

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-11 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
                >
                  {saving ? 'Sending…' : 'Send Invitation'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 h-11 border font-sans text-sm rounded-[1px] transition-colors hover:border-white"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-[1px] p-8" style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}>
            <h3 className="font-playfair text-white text-xl mb-3">Delete Client</h3>
            <p className="font-sans text-sm mb-8" style={{ color: 'var(--muted)' }}>
              This will permanently delete the client account and all associated documents. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 h-10 font-sans text-sm rounded-[1px] transition-colors"
                style={{ backgroundColor: 'var(--loss)', color: 'var(--white)' }}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 h-10 border font-sans text-sm rounded-[1px] transition-colors hover:border-white"
                style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
