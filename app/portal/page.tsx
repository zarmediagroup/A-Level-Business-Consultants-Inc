'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { DocumentRow } from '@/components/portal/DocumentRow'
import { UploadZone } from '@/components/portal/UploadZone'
import type { Document, Notification } from '@/types/database'

const widgetVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

// ─── Admin dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    recentUploads: 0,
    pendingReview: 0,
    openQueries: 0,
    unreadNotifs: 0,
  })
  const [recentDocs, setRecentDocs] = useState<Document[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    async function load() {
      const [docsRes, notifsRes, clientsRes] = await Promise.all([
        fetch('/api/admin/documents'),
        fetch('/api/notifications'),
        fetch('/api/admin/clients'),
      ])
      const docs: Document[]      = docsRes.ok    ? await docsRes.json()    : []
      const notifs: Notification[] = notifsRes.ok ? await notifsRes.json()  : []
      const clients: unknown[]     = clientsRes.ok ? await clientsRes.json() : []

      setRecentDocs(docs.slice(0, 5))
      setNotifications(notifs.slice(0, 5))
      setStats({
        totalClients:  clients.length,
        recentUploads: docs.filter(d => {
          const age = Date.now() - new Date(d.created_at).getTime()
          return age < 7 * 24 * 60 * 60 * 1000
        }).length,
        pendingReview: docs.filter(d => d.status === 'Under Review').length,
        openQueries:   docs.filter(d => d.status === 'Requires Action').length,
        unreadNotifs:  notifs.filter(n => !n.read).length,
      })
    }
    load()
  }, [])

  const statCards = [
    { label: 'Total Clients',   value: stats.totalClients,  href: '/portal/admin/clients' },
    { label: 'Uploads (7d)',    value: stats.recentUploads, href: '/portal/admin/documents' },
    { label: 'Pending Review',  value: stats.pendingReview, href: '/portal/admin/documents?status=Under+Review' },
    { label: 'Open Queries',    value: stats.openQueries,   href: '/portal/admin/documents?status=Requires+Action' },
  ]

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Stat cards */}
      {statCards.map((card, i) => (
        <motion.div
          key={card.label}
          custom={i} variants={widgetVariants} initial="hidden" animate="visible"
          className="col-span-6 lg:col-span-3"
        >
          <Link href={card.href}>
            <div
              className="rounded-[1px] p-6 transition-colors hover:border-white cursor-pointer"
              style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
            >
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--faint)' }}>
                {card.label}
              </p>
              <p className="font-bebas text-white" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                {card.value}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Recent uploads */}
      <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-7">
        <DashboardWidget
          label="Recent Uploads"
          action={<Link href="/portal/admin/documents" className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white" style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>View All →</Link>}
        >
          {recentDocs.length === 0 ? (
            <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No recent uploads.</p>
          ) : (
            <div>
              {recentDocs.map(doc => (
                <DocumentRow key={doc.id} name={doc.name} date={doc.created_at.slice(0, 10)} />
              ))}
            </div>
          )}
        </DashboardWidget>
      </motion.div>

      {/* Activity feed */}
      <motion.div custom={5} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-5">
        <DashboardWidget label="Activity Feed">
          {notifications.length === 0 ? (
            <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No recent activity.</p>
          ) : (
            <div className="flex flex-col gap-0">
              {notifications.map((n, i) => (
                <div
                  key={n.id}
                  className="py-3"
                  style={{ borderBottom: i < notifications.length - 1 ? '1px solid var(--rule)' : 'none' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans text-sm text-white">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-white shrink-0 mt-1.5" />}
                  </div>
                  <p className="font-sans text-[0.8rem] mt-0.5" style={{ color: 'var(--muted)' }}>{n.body}</p>
                  <p className="font-mono text-[0.65rem] mt-1" style={{ color: 'var(--faint)' }}>
                    {new Date(n.created_at).toLocaleDateString('en-ZA')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DashboardWidget>
      </motion.div>
    </div>
  )
}

// ─── Client dashboard ─────────────────────────────────────────────────────────
function ClientDashboard() {
  const { profile } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [uploadKey, setUploadKey] = useState(0)

  useEffect(() => {
    async function load() {
      const [docsRes, notifsRes] = await Promise.all([
        fetch('/api/documents'),
        fetch('/api/notifications'),
      ])
      if (docsRes.ok)   setDocuments(await docsRes.json())
      if (notifsRes.ok) setNotifications(await notifsRes.json())
    }
    load()
  }, [uploadKey])

  const requiresAction = documents.filter(d => d.status === 'Requires Action')

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Welcome */}
      <motion.div custom={0} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-playfair text-white text-2xl">
              Welcome back, {profile?.full_name?.split(' ')[0] ?? 'there'}
            </h2>
            <p className="font-sans text-sm mt-1" style={{ color: 'var(--muted)' }}>
              {profile?.service_category ? `Service: ${profile.service_category}` : 'Your document portal is ready.'}
            </p>
          </div>
          {requiresAction.length > 0 && (
            <Link
              href="/portal/documents"
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-4 py-2 border rounded-[1px] transition-colors hover:border-white"
              style={{ borderColor: 'var(--loss)', color: 'var(--loss)' }}
            >
              {requiresAction.length} Action{requiresAction.length > 1 ? 's' : ''} Required
            </Link>
          )}
        </div>
      </motion.div>

      {/* Recent Documents */}
      <motion.div custom={1} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget
          label="Recent Documents"
          action={
            <Link
              href="/portal/documents"
              className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
              style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
            >
              View All →
            </Link>
          }
        >
          {documents.length === 0 ? (
            <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No documents uploaded yet.</p>
          ) : (
            <div>
              {documents.slice(0, 5).map(doc => (
                <DocumentRow key={doc.id} name={doc.name} date={doc.created_at.slice(0, 10)} />
              ))}
            </div>
          )}
        </DashboardWidget>
      </motion.div>

      {/* Upload */}
      <motion.div custom={2} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Upload Documents">
          <UploadZone onSuccess={() => setUploadKey(k => k + 1)} />
        </DashboardWidget>
      </motion.div>

      {/* Notifications */}
      <motion.div custom={3} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Notifications">
          {notifications.length === 0 ? (
            <p className="font-sans text-sm" style={{ color: 'var(--faint)' }}>No notifications.</p>
          ) : (
            <div className="flex flex-col gap-0">
              {notifications.slice(0, 5).map((n, i) => (
                <div
                  key={n.id}
                  className="py-3"
                  style={{ borderBottom: i < Math.min(notifications.length, 5) - 1 ? '1px solid var(--rule)' : 'none' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-sans text-sm text-white">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-white shrink-0 mt-1.5" />}
                  </div>
                  <p className="font-sans text-[0.8rem] mt-0.5" style={{ color: 'var(--muted)' }}>{n.body}</p>
                </div>
              ))}
            </div>
          )}
        </DashboardWidget>
      </motion.div>

      {/* Stats */}
      <motion.div custom={4} variants={widgetVariants} initial="hidden" animate="visible" className="col-span-12 lg:col-span-6">
        <DashboardWidget label="Document Summary">
          <div className="flex flex-col gap-0">
            {[
              { label: 'Total Documents',   value: documents.length },
              { label: 'Processed',         value: documents.filter(d => d.status === 'Processed').length, color: 'var(--profit)' },
              { label: 'Under Review',      value: documents.filter(d => d.status === 'Under Review').length, color: 'var(--pending)' },
              { label: 'Requires Action',   value: documents.filter(d => d.status === 'Requires Action').length, color: 'var(--loss)' },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-3"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--rule)' : 'none' }}
              >
                <span className="font-sans text-sm" style={{ color: 'var(--muted)' }}>{row.label}</span>
                <span className="font-mono text-sm font-medium" style={{ color: row.color ?? 'var(--off-white)' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </motion.div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PortalDashboard() {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: 'var(--faint)' }}>
          Loading…
        </p>
      </div>
    )
  }

  return profile?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />
}
