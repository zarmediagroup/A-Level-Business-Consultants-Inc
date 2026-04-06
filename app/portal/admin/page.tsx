'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { useNotifications } from '@/contexts/NotificationContext'
import type { Document, AuditLog } from '@/types/database'

const variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

const ACTION_LABELS: Record<string, string> = {
  'document.upload':       '📤 Document uploaded',
  'document.resubmit':     '🔄 Document resubmitted',
  'document.delete':       '🗑 Document deleted',
  'document.status_change':'🔖 Status changed',
  'comment.create':        '💬 Comment posted',
  'client.create':         '👤 Client created',
  'client.update':         '✏️ Client updated',
  'client.delete':         '🗑 Client deleted',
}

export default function AdminOverviewPage() {
  const { unreadCount } = useNotifications()
  const [docs,    setDocs]    = useState<Document[]>([])
  const [audit,   setAudit]   = useState<AuditLog[]>([])
  const [clients, setClients] = useState<unknown[]>([])

  useEffect(() => {
    async function load() {
      const [dr, ar, cr] = await Promise.all([
        fetch('/api/admin/documents'),
        fetch('/api/admin/audit?limit=10'),
        fetch('/api/admin/clients'),
      ])
      if (dr.ok) setDocs(await dr.json())
      if (ar.ok) { const j = await ar.json(); setAudit(j.data ?? []) }
      if (cr.ok) setClients(await cr.json())
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Clients',    value: clients.length,                                                      href: '/portal/admin/clients' },
    { label: 'Total Documents',  value: docs.length,                                                         href: '/portal/admin/documents' },
    { label: 'Pending Review',   value: docs.filter(d => d.status === 'Under Review').length,                href: '/portal/admin/documents' },
    { label: 'Open Queries',     value: docs.filter(d => d.status === 'Requires Action').length,             href: '/portal/admin/documents' },
    { label: 'Unread Alerts',    value: unreadCount,                                                         href: '/portal/notifications' },
  ]

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Stat cards */}
      {statCards.map((card, i) => (
        <motion.div key={card.label} custom={i} variants={variants} initial="hidden" animate="visible" className="col-span-6 lg:col-span-2-and-half">
          <Link href={card.href}>
            <div
              className="rounded-[1px] p-5 transition-colors hover:border-white cursor-pointer"
              style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
            >
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase mb-2" style={{ color: 'var(--faint)' }}>
                {card.label}
              </p>
              <p className="font-bebas text-white" style={{ fontSize: '2.2rem', lineHeight: 1 }}>
                {card.value}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Recent uploads */}
      <motion.div custom={5} variants={variants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-8">
        <DashboardWidget
          label="Recent Document Activity"
          action={<Link href="/portal/admin/documents" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>View All →</Link>}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--rule)' }}>
                  {['Document', 'Client', 'Category', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left pb-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase pr-4" style={{ color: 'var(--faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {docs.slice(0, 8).map(doc => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                    <td className="py-2.5 pr-4 font-sans text-sm text-white max-w-[200px] truncate">{doc.name}</td>
                    <td className="py-2.5 pr-4 font-sans text-sm" style={{ color: 'var(--muted)' }}>
                      {(doc.client as unknown as { full_name: string } | undefined)?.full_name ?? '—'}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4"><StatusBadge status={doc.status} /></td>
                    <td className="py-2.5 font-mono text-[0.75rem]" style={{ color: 'var(--faint)' }}>{doc.created_at.slice(0, 10)}</td>
                  </tr>
                ))}
                {docs.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center font-mono text-sm" style={{ color: 'var(--faint)' }}>No documents yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </DashboardWidget>
      </motion.div>

      {/* Audit log snippet */}
      <motion.div custom={6} variants={variants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-4">
        <DashboardWidget
          label="Recent Activity"
          action={<Link href="/portal/admin/audit" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>Full Log →</Link>}
        >
          <div className="flex flex-col gap-0">
            {audit.slice(0, 8).map((entry, i) => (
              <div key={entry.id} className="py-2.5" style={{ borderBottom: i < Math.min(audit.length, 8) - 1 ? '1px solid var(--rule)' : 'none' }}>
                <p className="font-sans text-sm text-white">
                  {ACTION_LABELS[entry.action] ?? entry.action}
                </p>
                <p className="font-mono text-[0.65rem] mt-0.5" style={{ color: 'var(--faint)' }}>
                  {entry.actor_email} · {new Date(entry.created_at).toLocaleDateString('en-ZA')}
                </p>
              </div>
            ))}
            {audit.length === 0 && (
              <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No activity yet.</p>
            )}
          </div>
        </DashboardWidget>
      </motion.div>
    </div>
  )
}
