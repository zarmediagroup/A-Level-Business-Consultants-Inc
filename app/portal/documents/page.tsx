'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { UploadZone } from '@/components/portal/UploadZone'
import { DocumentComments } from '@/components/portal/DocumentComments'
import { EditDocumentForm } from '@/components/portal/EditDocumentForm'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { useAuth } from '@/contexts/AuthContext'
import type { Document, DocumentCategory, DocumentStatus } from '@/types/database'

const CATEGORIES: (DocumentCategory | 'All')[] = [
  'All', 'Bank Statement', 'Invoice', 'Tax Certificate',
  'ID Document', 'AFS', 'Management Accounts', 'SARS Returns', 'Payroll', 'Other',
]

const STATUS_OPTIONS: (DocumentStatus | 'All')[] = [
  'All', 'Received', 'Under Review', 'Processed', 'Requires Action',
]

const PAGE_SIZE = 10

export default function DocumentsPage() {
  const { isAdmin } = useAuth()
  const [documents,      setDocuments]      = useState<Document[]>([])
  const [loading,        setLoading]        = useState(true)
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'All'>('All')
  const [activeStatus,   setActiveStatus]   = useState<DocumentStatus | 'All'>('All')
  const [search,         setSearch]         = useState('')
  const [yearFilter,     setYearFilter]     = useState('')
  const [page,           setPage]           = useState(1)
  const [drawerOpen,     setDrawerOpen]     = useState(false)
  const [selectedDoc,    setSelectedDoc]    = useState<Document | null>(null)
  const [deleteId,       setDeleteId]       = useState<string | null>(null)
  const [editDoc,        setEditDoc]        = useState<Document | null>(null)
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null)
  const [uploadKey,      setUploadKey]      = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    const url = isAdmin ? '/api/admin/documents' : '/api/documents'
    const params = new URLSearchParams()
    if (activeCategory !== 'All') params.set('category', activeCategory)
    if (activeStatus   !== 'All') params.set('status', activeStatus)
    if (yearFilter)                params.set('year', yearFilter)
    if (search)                    params.set('search', search)

    const res = await fetch(`${url}?${params}`)
    if (res.ok) setDocuments(await res.json())
    setLoading(false)
  }, [isAdmin, activeCategory, activeStatus, yearFilter, search])

  useEffect(() => { load() }, [load, uploadKey])

  const totalPages = Math.ceil(documents.length / PAGE_SIZE)
  const paginated  = documents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  async function handleDownload(doc: Document) {
    const res = await fetch(`/api/documents/${doc.id}`)
    if (!res.ok) return alert('Download failed.')
    const { url, name } = await res.json()
    const a = Object.assign(document.createElement('a'), { href: url, download: name })
    a.click()
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' })
    if (res.ok) { setDeleteId(null); load() }
    else alert('Delete failed.')
  }

  async function handleStatusChange(id: string, status: DocumentStatus) {
    setStatusUpdating(id)
    const res = await fetch(`/api/documents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setStatusUpdating(null)
    if (res.ok) load()
    else alert('Status update failed.')
  }

  const years = Array.from({ length: 8 }, (_, i) => String(new Date().getFullYear() - i))

  return (
    <div>
      <DashboardWidget
        label="Document Vault"
        action={
          <button
            onClick={() => setDrawerOpen(true)}
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          >
            Upload +
          </button>
        }
      >
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1) }}
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px] transition-all"
              style={{
                borderColor: activeCategory === cat ? 'var(--white)' : 'var(--rule-mid)',
                color:       activeCategory === cat ? 'var(--white)' : 'var(--muted)',
                backgroundColor: activeCategory === cat ? 'var(--ash)' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <input
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="h-9 px-4 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white placeholder-faint focus:outline-none focus:border-white transition-colors flex-1 min-w-[160px]"
          />
          <select
            value={yearFilter}
            onChange={e => { setYearFilter(e.target.value); setPage(1) }}
            className="h-9 px-3 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white focus:outline-none focus:border-white transition-colors"
          >
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={activeStatus}
            onChange={e => { setActiveStatus(e.target.value as DocumentStatus | 'All'); setPage(1) }}
            className="h-9 px-3 bg-ink border border-graphite rounded-[1px] font-mono text-sm text-white focus:outline-none focus:border-white transition-colors"
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <p className="font-mono text-[0.75rem] py-8 text-center" style={{ color: 'var(--faint)' }}>Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                  {['Name', 'Category', 'Year', 'Status', isAdmin ? 'Client' : 'Uploaded By', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-4" style={{ color: 'var(--faint)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(doc => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--rule)' }} className="group">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: 'var(--muted)' }}>📄</span>
                        <span className="font-sans text-sm text-white">{doc.name}</span>
                        {doc.is_resubmission && (
                          <span className="font-mono text-[0.55rem] tracking-[0.08em] uppercase px-1.5 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--pending)', color: 'var(--pending)' }}>
                            Resubmit
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-mono text-[0.75rem]" style={{ color: 'var(--muted)' }}>{doc.year}</span>
                    </td>
                    <td className="py-3 pr-4">
                      {isAdmin ? (
                        <select
                          value={doc.status}
                          disabled={statusUpdating === doc.id}
                          onChange={e => handleStatusChange(doc.id, e.target.value as DocumentStatus)}
                          className="bg-transparent border rounded-[1px] font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 focus:outline-none cursor-pointer"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                        >
                          {['Received','Under Review','Processed','Requires Action'].map(s => (
                            <option key={s} value={s} style={{ backgroundColor: 'var(--carbon)', color: 'var(--white)' }}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <StatusBadge status={doc.status} />
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                        {isAdmin
                          ? (doc.client as unknown as { full_name: string } | undefined)?.full_name ?? '—'
                          : (doc.uploader as unknown as { full_name: string } | undefined)?.full_name ?? '—'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>
                        {doc.created_at.slice(0, 10)}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(doc)}
                          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                          title="Download"
                        >
                          ↓
                        </button>
                        {!isAdmin && (
                          <button
                            onClick={() => setEditDoc(doc)}
                            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                            style={{
                              borderColor: doc.status === 'Requires Action' ? 'var(--pending)' : 'var(--rule-mid)',
                              color:       doc.status === 'Requires Action' ? 'var(--pending)' : 'var(--muted)',
                            }}
                            title="Edit document"
                          >
                            ✏
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
                          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                          title="Comments"
                        >
                          💬
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => setDeleteId(doc.id)}
                            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-colors hover:border-white"
                            style={{ borderColor: 'var(--rule-mid)', color: 'var(--loss)' }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
            <p className="font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>{documents.length} documents</p>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 font-mono text-[0.75rem] border rounded-[1px] transition-all"
                  style={{
                    borderColor:     p === page ? 'var(--white)' : 'var(--rule-mid)',
                    color:           p === page ? 'var(--white)' : 'var(--muted)',
                    backgroundColor: p === page ? 'var(--ash)'  : 'transparent',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </DashboardWidget>

      {/* Upload Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{ width: 'min(480px, 100vw)', backgroundColor: 'var(--carbon)', borderLeft: '1px solid var(--rule)' }}
            >
              <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
                <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                  Upload Document
                </p>
                <button onClick={() => setDrawerOpen(false)} className="font-mono text-lg text-white" aria-label="Close">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <UploadZone onSuccess={() => { setDrawerOpen(false); setUploadKey(k => k + 1) }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Document Drawer */}
      <AnimatePresence>
        {editDoc && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              onClick={() => setEditDoc(null)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{ width: 'min(480px, 100vw)', backgroundColor: 'var(--carbon)', borderLeft: '1px solid var(--rule)' }}
            >
              <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                    Edit Document
                  </p>
                  <p className="font-sans text-sm text-white mt-1 truncate max-w-[320px]">{editDoc.name}</p>
                </div>
                <button onClick={() => setEditDoc(null)} className="font-mono text-lg text-white" aria-label="Close">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <EditDocumentForm
                  document={editDoc}
                  onSuccess={() => { setEditDoc(null); setUploadKey(k => k + 1) }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Comments Panel */}
      <AnimatePresence>
        {selectedDoc && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
              onClick={() => setSelectedDoc(null)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{ width: 'min(520px, 100vw)', backgroundColor: 'var(--carbon)', borderLeft: '1px solid var(--rule)' }}
            >
              <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                    Comments
                  </p>
                  <p className="font-sans text-sm text-white mt-1 truncate max-w-[320px]">{selectedDoc.name}</p>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="font-mono text-lg text-white" aria-label="Close">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <DocumentComments
                  documentId={selectedDoc.id}
                  documentName={selectedDoc.name}
                  onResubmit={() => { setSelectedDoc(null); setDrawerOpen(true) }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          >
            <motion.div
              initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
              className="w-full max-w-sm rounded-[1px] p-8"
              style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
            >
              <h3 className="font-playfair text-white text-xl mb-3">Delete Document</h3>
              <p className="font-sans text-sm mb-8" style={{ color: 'var(--muted)' }}>
                This action cannot be undone. The file will be permanently removed from storage.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 h-10 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
