'use client'

import { useState, useRef } from 'react'
import type { Document, DocumentCategory } from '@/types/database'
import { DOCUMENT_CATEGORIES } from '@/types/database'

interface Props {
  document: Document
  onSuccess: () => void
}

const ACCEPTED = '.pdf,.doc,.docx,.xlsx,.xls,.csv,.jpg,.jpeg,.png'
const MAX_MB   = 25

export function EditDocumentForm({ document: doc, onSuccess }: Props) {
  const [name,     setName]     = useState(doc.name)
  const [category, setCategory] = useState<DocumentCategory>(doc.category)
  const [year,     setYear]     = useState(String(doc.year))
  const [file,     setFile]     = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const years = Array.from({ length: 8 }, (_, i) => String(new Date().getFullYear() - i))

  function handleFileChange(f: File | null) {
    if (!f) return
    if (f.size > MAX_MB * 1024 * 1024) { setError(`File must be under ${MAX_MB} MB.`); return }
    setError('')
    setFile(f)
    if (!name.trim() || name === doc.name) setName(f.name)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Document name is required.'); return }

    setSaving(true)
    setError('')

    const fd = new FormData()
    fd.append('name',     name.trim())
    fd.append('category', category)
    fd.append('year',     year)
    if (file) fd.append('file', file)

    const res = await fetch(`/api/documents/${doc.id}`, { method: 'PATCH', body: fd })
    setSaving(false)

    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error ?? 'Save failed. Please try again.')
      return
    }

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase" style={{ color: 'var(--faint)' }}>
          Document Name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="h-10 px-4 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase" style={{ color: 'var(--faint)' }}>
          Category
        </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value as DocumentCategory)}
          className="h-10 px-4 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors"
        >
          {DOCUMENT_CATEGORIES.map(c => (
            <option key={c} value={c} style={{ backgroundColor: 'var(--carbon)' }}>{c}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase" style={{ color: 'var(--faint)' }}>
          Year
        </label>
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="h-10 px-4 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors"
        >
          {years.map(y => (
            <option key={y} value={y} style={{ backgroundColor: 'var(--carbon)' }}>{y}</option>
          ))}
        </select>
      </div>

      {/* Optional file replacement */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase" style={{ color: 'var(--faint)' }}>
          Replace File <span style={{ color: 'var(--muted)' }}>(optional)</span>
        </label>
        <div
          onClick={() => fileInput.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault(); setDragging(false)
            handleFileChange(e.dataTransfer.files[0] ?? null)
          }}
          className="flex flex-col items-center justify-center gap-2 p-6 border rounded-[1px] cursor-pointer transition-colors"
          style={{
            borderColor:     dragging ? 'var(--white)' : 'var(--rule-mid)',
            borderStyle:     'dashed',
            backgroundColor: dragging ? 'var(--ash)' : 'transparent',
          }}
        >
          {file ? (
            <>
              <p className="font-sans text-sm text-white truncate max-w-full">{file.name}</p>
              <p className="font-mono text-[0.6rem]" style={{ color: 'var(--faint)' }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB · Click to change
              </p>
            </>
          ) : (
            <>
              <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                Drag & drop or click to select a replacement file
              </p>
              <p className="font-mono text-[0.6rem]" style={{ color: 'var(--faint)' }}>
                PDF, Word, Excel, CSV, Image · max {MAX_MB} MB
              </p>
              <p className="font-mono text-[0.6rem] mt-1" style={{ color: 'var(--faint)' }}>
                Current: {doc.name}
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInput}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>

      {error && (
        <p className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{error}</p>
      )}

      <div className="pt-2" style={{ borderTop: '1px solid var(--rule)' }}>
        <p className="font-sans text-xs mb-4" style={{ color: 'var(--faint)' }}>
          Saving will reset this document&apos;s status to <strong style={{ color: 'var(--muted)' }}>Received</strong> and notify your accountant.
        </p>
        <button
          type="submit"
          disabled={saving}
          className="w-full h-11 font-sans text-sm rounded-[1px] transition-colors disabled:opacity-60"
          style={{ backgroundColor: 'var(--white)', color: 'var(--ink)' }}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
