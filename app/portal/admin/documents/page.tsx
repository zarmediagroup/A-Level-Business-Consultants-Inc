'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DocumentComments } from '@/components/portal/DocumentComments'
import type { Document, DocumentStatus } from '@/types/database'

function DocumentsPanel() {
  const searchParams     = useSearchParams()
  const [documents,      setDocuments]      = useState<Document[]>([])
  const [loading,        setLoading]        = useState(true)
  const [search,         setSearch]         = useState('')
  const [category,       setCategory]       = useState('')
  const [year,           setYear]           = useState('')
  const [status,         setStatus]         = useState(searchParams.get('status') ?? '')
  const [deleteId,       setDeleteId]       = useState<string | null>(null)
  const [selectedDoc,    setSelectedDoc]    = useState<Document | null>(null)
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const p = new URLSearchParams()
    if (search)   p.set('search',   search)
    if (category) p.set('category', category)
    if (year)     p.set('year',     year)
    if (status)   p.set('status',   status)
    const res = await fetch(`/api/admin/documents?${p}`)
    if (res.ok) setDocuments(await res.json())
    setLoading(false)
  }, [search, category, year, status])

  useEffect(() => { load() }, [load])

  async function handleDownload(doc: Document) {
    const res = await fetch(`/api/documents/${doc.id}`)
    if (!res.ok) return alert('Download failed.')
    const { url, name } = await res.json()
    Object.assign(document.createElement('a'), { href: url, download: name }).click()
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' })
    if (res.ok) { setDeleteId(null); load() }
    else alert('Delete failed.')
  }

  async function handleStatusChange(id: string, newStatus: DocumentStatus) {
    setStatusUpdating(id)
    await fetch(`/api/documents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setStatusUpdating(null); load()
  }

  const years = Array.from({ length: 8 }, (_, i) => String(new Date().getFullYear() - i))
  const cats  = ['Bank Statement', 'Invoice', 'Tax Certificate', 'ID Document', 'AFS', 'Management Accounts', 'SARS Returns', 'Payroll', 'Other']

  return (
    <div>
      <DashboardWidget label="All Documents">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input
            type="search"
            placeholder="Search by file name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 px-4 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white placeholder-faint focus:outline-none focus:border-white transition-colors flex-1 min-w-[180px]"
          />
          {[
            {
              value: category, onChange: setCategory,
              opts: [['', 'All Categories'], ...cats.map(c => [c, c])],
            },
            {
              value: year, onChange: setYear,
              opts: [['', 'All Years'], ...years.map(y => [y, y])],
            },
            {
              value: status, onChange: setStatus,
              opts: [['', 'All Statuses'], ...['Received', 'Under Review', 'Processed', 'Requires Action'].map(s => [s, s])],
            },
          ].map((sel, i) => (
            <select
              key={i}
              value={sel.value}
              onChange={e => sel.onChange(e.target.value)}
              className="h-9 px-3 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
            >
              {sel.opts.map(([v, l]) => (
                <option key={v} value={v} style={{ backgroundColor: 'var(--carbon)' }}>{l}</option>
              ))}
            </select>
          ))}
        </div>

        {loading ? (
          <p className="font-mono text-[0.75rem] py-8 text-center" style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                  {['Document', 'Client', 'Category', 'Year', 'Status', 'Size', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-3" style={{ color: 'var(--faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                    <td className="py-2.5 pr-3 max-w-[180px]">
                      <p className="font-sans text-sm text-white truncate">{doc.name}</p>
                      {doc.is_resubmission && (
                        <span className="font-mono text-[0.55rem] uppercase px-1 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--pending)', color: 'var(--pending)' }}>Resubmit</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 font-sans text-sm" style={{ color: 'var(--muted)' }}>
                      {(doc.client as unknown as { full_name: string } | undefined)?.full_name ?? '—'}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{doc.year}</td>
                    <td className="py-2.5 pr-3">
                      <select
                        value={doc.status}
                        disabled={statusUpdating === doc.id}
                        onChange={e => handleStatusChange(doc.id, e.target.value as DocumentStatus)}
                        className="bg-transparent border rounded-[1px] font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 focus:outline-none cursor-pointer"
                        style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                      >
                        {['Received', 'Under Review', 'Processed', 'Requires Action'].map(s => (
                          <option key={s} value={s} style={{ backgroundColor: 'var(--carbon)', color: 'var(--white)' }}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[0.7rem]" style={{ color: 'var(--faint)' }}>
                      {(doc.file_size / 1024 / 1024).toFixed(1)} MB
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[0.7rem]" style={{ color: 'var(--faint)' }}>
                      {doc.created_at.slice(0, 10)}
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleDownload(doc)} className="font-mono text-[0.65rem] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>↓</button>
                        <button onClick={() => setSelectedDoc(doc)} className="font-mono text-[0.65rem] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>💬</button>
                        <button onClick={() => setDeleteId(doc.id)} className="font-mono text-[0.65rem] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--loss)' }}>×</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr><td colSpan={8} className="py-10 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>No documents found.</td></tr>
                )}
              </tbody>
            </table>
            <div className="mt-3 font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>
              {documents.length} document{documents.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </DashboardWidget>

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

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-[1px] p-8" style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}>
            <h3 className="font-playfair text-white text-xl mb-3">Delete Document</h3>
            <p className="font-sans text-sm mb-8" style={{ color: 'var(--muted)' }}>This will permanently remove the file. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 h-10 font-sans text-sm rounded-[1px]" style={{ backgroundColor: 'var(--loss)', color: 'var(--white)' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 h-10 border font-sans text-sm rounded-[1px] hover:border-white transition-colors" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDocumentsPage() {
  return <Suspense><DocumentsPanel /></Suspense>
}
