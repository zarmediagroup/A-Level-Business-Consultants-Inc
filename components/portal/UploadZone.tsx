'use client'

import { useRef, useState } from 'react'
import { DOCUMENT_CATEGORIES, type DocumentCategory } from '@/types/database'

interface Props {
  onSuccess?: () => void
  clientId?:  string   // Admin can upload on behalf of a client
}

const ACCEPTED = '.pdf,.doc,.docx,.xlsx,.xls,.csv,.jpg,.jpeg,.png'
const MAX_MB   = 25

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 8 }, (_, i) => currentYear - i)

export function UploadZone({ onSuccess, clientId }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging,  setDragging]  = useState(false)
  const [files,     setFiles]     = useState<File[]>([])
  const [category,  setCategory]  = useState<DocumentCategory | ''>('')
  const [year,      setYear]      = useState<number>(currentYear)
  const [uploading, setUploading] = useState(false)
  const [progress,  setProgress]  = useState<string[]>([])
  const [errors,    setErrors]    = useState<string[]>([])

  function addFiles(incoming: FileList | null) {
    if (!incoming) return
    const valid: File[] = []
    const errs: string[] = []
    Array.from(incoming).forEach(f => {
      if (f.size > MAX_MB * 1024 * 1024) {
        errs.push(`${f.name} exceeds ${MAX_MB} MB limit.`)
      } else {
        valid.push(f)
      }
    })
    setFiles(prev => [...prev, ...valid])
    setErrors(errs)
  }

  async function handleUpload() {
    if (!files.length || !category || !year) return
    setUploading(true)
    setProgress([])
    setErrors([])

    const results: string[] = []

    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('category', category)
      fd.append('year', String(year))
      if (clientId) fd.append('client_id', clientId)

      setProgress(prev => [...prev, `Uploading ${file.name}…`])

      const res = await fetch('/api/documents', { method: 'POST', body: fd })

      if (res.ok) {
        results.push(`✓ ${file.name}`)
      } else {
        const j = await res.json().catch(() => ({}))
        results.push(`✗ ${file.name}: ${j.error ?? 'Upload failed'}`)
      }
    }

    setProgress(results)
    setUploading(false)

    const allOk = results.every(r => r.startsWith('✓'))
    if (allOk) {
      setFiles([])
      setCategory('')
      setTimeout(() => { setProgress([]); onSuccess?.() }, 1500)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        className={`upload-zone flex flex-col items-center justify-center gap-3 ${dragging ? 'dragover' : ''}`}
        style={{ minHeight: '130px', padding: '1.5rem', cursor: 'pointer' }}
        onDragOver={e  => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e      => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload documents"
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--muted)' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="font-sans text-sm text-center" style={{ color: 'var(--muted)' }}>
          {files.length > 0
            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
            : 'Drag & drop documents here'}
        </p>
        <button
          type="button"
          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px] transition-colors hover:border-white hover:text-white"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
        >
          Browse Files
        </button>
        <p className="font-mono text-[0.6rem]" style={{ color: 'var(--faint)' }}>
          PDF, Word, Excel, Images · Max {MAX_MB} MB each · Encrypted at rest
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="flex flex-col gap-1">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-[1px]" style={{ backgroundColor: 'var(--ink)', border: '1px solid var(--rule)' }}>
              <span className="font-sans text-sm truncate" style={{ color: 'var(--muted)' }}>{f.name}</span>
              <button
                onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                className="font-mono text-sm ml-3 shrink-0"
                style={{ color: 'var(--faint)' }}
                aria-label={`Remove ${f.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category + Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
            Category *
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as DocumentCategory)}
            className="w-full h-10 px-3 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
          >
            <option value="">Select…</option>
            {DOCUMENT_CATEGORIES.map(c => (
              <option key={c} value={c} style={{ backgroundColor: 'var(--carbon)' }}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono text-[0.6rem] tracking-[0.14em] uppercase block mb-1.5" style={{ color: 'var(--muted)' }}>
            Year *
          </label>
          <select
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="w-full h-10 px-3 bg-ink border border-graphite rounded-[1px] font-sans text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
          >
            {YEARS.map(y => (
              <option key={y} value={y} style={{ backgroundColor: 'var(--carbon)' }}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div>
          {errors.map((e, i) => (
            <p key={i} className="font-mono text-[0.65rem]" style={{ color: 'var(--loss)' }}>{e}</p>
          ))}
        </div>
      )}

      {/* Progress */}
      {progress.length > 0 && (
        <div>
          {progress.map((p, i) => (
            <p key={i} className="font-mono text-[0.65rem]" style={{ color: p.startsWith('✓') ? 'var(--profit)' : 'var(--loss)' }}>{p}</p>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading || !files.length || !category || !year}
        className="w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading…' : `Upload ${files.length > 0 ? `${files.length} File${files.length > 1 ? 's' : ''}` : 'Files'}`}
      </button>
    </div>
  )
}
