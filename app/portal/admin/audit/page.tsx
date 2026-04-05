'use client'

import { useState, useEffect } from 'react'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import type { AuditLog } from '@/types/database'

const ACTION_LABELS: Record<string, string> = {
  'document.upload':        '📤 Document Uploaded',
  'document.resubmit':      '🔄 Document Resubmitted',
  'document.delete':        '🗑 Document Deleted',
  'document.status_change': '🔖 Status Changed',
  'comment.create':         '💬 Comment Posted',
  'client.create':          '👤 Client Created',
  'client.update':          '✏️ Client Updated',
  'client.delete':          '🗑 Client Deleted',
}

const PAGE_SIZE = 50

export default function AuditLogPage() {
  const [entries,  setEntries]  = useState<AuditLog[]>([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [offset,   setOffset]   = useState(0)

  async function load(off = 0) {
    setLoading(true)
    const res = await fetch(`/api/admin/audit?limit=${PAGE_SIZE}&offset=${off}`)
    if (res.ok) {
      const j = await res.json()
      setEntries(j.data ?? [])
      setTotal(j.total ?? 0)
    }
    setLoading(false)
  }

  useEffect(() => { load(offset) }, [offset])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1

  return (
    <DashboardWidget label="Activity & Audit Log">
      <p className="font-mono text-[0.65rem] tracking-[0.08em] mb-6" style={{ color: 'var(--faint)' }}>
        Immutable record of all portal actions.
      </p>

      {loading ? (
        <p className="font-mono text-[0.75rem] py-8 text-center" style={{ color: 'var(--faint)' }}>Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                {['Action', 'Actor', 'Resource', 'Details', 'Timestamp'].map(h => (
                  <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-4" style={{ color: 'var(--faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={entry.id} style={{ borderBottom: i < entries.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                  <td className="py-2.5 pr-4">
                    <span className="font-sans text-sm text-white">{ACTION_LABELS[entry.action] ?? entry.action}</span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-[0.7rem]" style={{ color: 'var(--muted)' }}>
                    {entry.actor_email ?? '—'}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
                      {entry.resource_type}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-[0.7rem] max-w-[200px]" style={{ color: 'var(--faint)' }}>
                    {entry.metadata
                      ? Object.entries(entry.metadata)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')
                      : '—'}
                  </td>
                  <td className="py-2.5 font-mono text-[0.7rem]" style={{ color: 'var(--faint)' }}>
                    {new Date(entry.created_at).toLocaleString('en-ZA', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr><td colSpan={5} className="py-10 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>No audit entries yet.</td></tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
              <p className="font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>
                {total} entries · Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={offset === 0}
                  onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
                  className="h-8 px-4 font-mono text-[0.65rem] uppercase border rounded-[1px] transition-colors hover:border-white hover:text-white disabled:opacity-40"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  ← Prev
                </button>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setOffset(offset + PAGE_SIZE)}
                  className="h-8 px-4 font-mono text-[0.65rem] uppercase border rounded-[1px] transition-colors hover:border-white hover:text-white disabled:opacity-40"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardWidget>
  )
}
