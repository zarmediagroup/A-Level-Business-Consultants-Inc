'use client'

import { useRef, useState } from 'react'

const categories = ['AFS', 'Management Accounts', 'SARS Returns', 'Bank Statements', 'Invoices', 'Payroll']

export function UploadZone() {
  const [dragging, setDragging] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`upload-zone rounded-[1px] flex flex-col items-center justify-center gap-3 ${dragging ? 'dragover' : ''}`}
        style={{ minHeight: '140px', padding: '2rem' }}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload documents"
        onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.xlsx,.csv,.xls"
        />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--muted)' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="font-sans text-sm text-center" style={{ color: 'var(--muted)' }}>
          Drag & drop financial documents
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
          PDF, XLSX, CSV up to 25MB · All files encrypted at rest
        </p>
      </div>

      {/* Category tags */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(selected === cat ? null : cat)}
            className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] transition-all duration-200"
            style={{
              borderColor: selected === cat ? 'var(--white)' : 'var(--rule-mid)',
              color: selected === cat ? 'var(--white)' : 'var(--muted)',
              backgroundColor: selected === cat ? 'var(--ash)' : 'transparent',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
