'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DocumentComments } from '@/components/portal/DocumentComments'
import type { Profile, Document, ClientNote } from '@/types/database'

interface ClientData {
  profile:   Profile
  documents: Document[]
  notes:     ClientNote[]
}

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [data,         setData]         = useState<ClientData | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [editing,      setEditing]      = useState(false)
  const [saving,       setSaving]       = useState(false)
  const [note,         setNote]         = useState('')
  const [noteLoading,  setNoteLoading]  = useState(false)
  const [selectedDoc,  setSelectedDoc]  = useState<Document | null>(null)

  const [editForm, setEditForm] = useState({
    full_name: '', phone: '', company: '', service_category: '',
  })

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/clients/${id}`)
    if (res.ok) {
      const d: ClientData = await res.json()
      setData(d)
      setEditForm({
        full_name:        d.profile.full_name,
        phone:            d.profile.phone ?? '',
        company:          d.profile.company ?? '',
        service_category: d.profile.service_category ?? '',
      })
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/clients/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(editForm),
    })
    setSaving(false); setEditing(false); load()
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!note.trim()) return
    setNoteLoading(true)
    await fetch(`/api/admin/clients/${id}/notes`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ content: note }),
    })
    setNoteLoading(false); setNote(''); load()
  }

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>Loading…</p>
    </div>
  )

  if (!data) return (
    <div className="py-16 text-center">
      <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>Client not found.</p>
      <Link href="/portal/admin/clients" className="font-mono text-[0.65rem] uppercase mt-4 inline-block" style={{ color: 'var(--faint)' }}>← Back to Clients</Link>
    </div>
  )

  const { profile, documents, notes } = data
  const inputClass = 'w-full h-10 px-3 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors'

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <Link href="/portal/admin/clients" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>
        ← All Clients
      </Link>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <DashboardWidget
            label="Client Profile"
            action={
              <button
                onClick={() => setEditing(e => !e)}
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
              >
                {editing ? 'Cancel' : 'Edit'}
              </button>
            }
          >
            {editing ? (
              <form onSubmit={handleSave} className="flex flex-col gap-3">
                {[
                  { label: 'Full Name',        key: 'full_name'        as const },
                  { label: 'Phone',            key: 'phone'            as const },
                  { label: 'Company',          key: 'company'          as const },
                  { label: 'Service Category', key: 'service_category' as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase block mb-1" style={{ color: 'var(--muted)' }}>{label}</label>
                    <input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} className={inputClass} />
                  </div>
                ))}
                <button type="submit" disabled={saving} className="h-10 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60 mt-2">
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Name',     value: profile.full_name },
                  { label: 'Email',    value: profile.email },
                  { label: 'Phone',    value: profile.phone ?? '—' },
                  { label: 'Company',  value: profile.company ?? '—' },
                  { label: 'Service',  value: profile.service_category ?? '—' },
                  { label: 'Joined',   value: new Date(profile.created_at).toLocaleDateString('en-ZA') },
                  { label: 'Last Login', value: profile.last_login ? new Date(profile.last_login).toLocaleDateString('en-ZA') : 'Never' },
                ].map(({ label, value }, i, arr) => (
                  <div key={label} className="flex flex-col py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                    <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>{label}</span>
                    <span className="font-sans text-sm text-white mt-0.5">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </DashboardWidget>

          {/* Notes */}
          <DashboardWidget label="Internal Notes">
            <form onSubmit={handleAddNote} className="flex flex-col gap-3 mb-5">
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a private note..."
                rows={3}
                className="w-full px-3 py-2 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white resize-none focus:outline-none focus:border-white transition-colors"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              />
              <button
                type="submit"
                disabled={noteLoading || !note.trim()}
                className="h-9 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-60"
              >
                {noteLoading ? 'Adding…' : 'Add Note'}
              </button>
            </form>
            <div className="flex flex-col gap-0">
              {notes.map((n, i) => (
                <div key={n.id} className="py-2.5" style={{ borderTop: i > 0 ? '1px solid var(--rule)' : 'none' }}>
                  <p className="font-sans text-sm text-white">{n.content}</p>
                  <p className="font-mono text-[0.65rem] mt-1" style={{ color: 'var(--faint)' }}>
                    {(n.author as unknown as { full_name: string } | undefined)?.full_name ?? '—'} · {new Date(n.created_at).toLocaleDateString('en-ZA')}
                  </p>
                </div>
              ))}
              {notes.length === 0 && <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No notes yet.</p>}
            </div>
          </DashboardWidget>
        </div>

        {/* Documents */}
        <div className="col-span-12 lg:col-span-8">
          <DashboardWidget label={`Documents (${documents.length})`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                    {['Name', 'Category', 'Year', 'Status', 'Date', ''].map(h => (
                      <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-4" style={{ color: 'var(--faint)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                      <td className="py-2.5 pr-4 font-sans text-sm text-white max-w-[180px] truncate">{doc.name}</td>
                      <td className="py-2.5 pr-4">
                        <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{doc.year}</td>
                      <td className="py-2.5 pr-4"><StatusBadge status={doc.status} /></td>
                      <td className="py-2.5 pr-4 font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>{doc.created_at.slice(0, 10)}</td>
                      <td className="py-2.5">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                        >
                          💬
                        </button>
                      </td>
                    </tr>
                  ))}
                  {documents.length === 0 && (
                    <tr><td colSpan={6} className="py-10 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>No documents uploaded.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </DashboardWidget>
        </div>
      </div>

      {/* Comments panel */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setSelectedDoc(null)}>
          <div
            className="ml-auto h-full flex flex-col"
            style={{ width: 'min(520px, 100vw)', backgroundColor: 'var(--carbon)', borderLeft: '1px solid var(--rule)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>Comments</p>
                <p className="font-sans text-sm text-white mt-1 truncate max-w-[340px]">{selectedDoc.name}</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="font-mono text-lg text-white">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <DocumentComments documentId={selectedDoc.id} documentName={selectedDoc.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
