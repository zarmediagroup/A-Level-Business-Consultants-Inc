'use client'

import { useState, useEffect } from 'react'
import { DashboardWidget } from '@/components/portal/DashboardWidget'
import type { Notification } from '@/types/database'

const TYPE_ICONS: Record<string, string> = {
  upload:        '📤',
  resubmission:  '🔄',
  status_change: '🔖',
  comment:       '💬',
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading,       setLoading]       = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/notifications')
    if (res.ok) setNotifications(await res.json())
    setLoading(false)
  }

  async function markAllRead() {
    await fetch('/api/notifications/mark-read', { method: 'POST', body: '{}', headers: { 'Content-Type': 'application/json' } })
    load()
  }

  async function markOneRead(id: string) {
    await fetch('/api/notifications/mark-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  }

  useEffect(() => { load() }, [])

  const unread = notifications.filter(n => !n.read).length

  return (
    <DashboardWidget
      label="Notification Centre"
      action={
        unread > 0 ? (
          <button
            onClick={markAllRead}
            className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-colors hover:border-white hover:text-white"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          >
            Mark All Read
          </button>
        ) : undefined
      }
    >
      {loading ? (
        <p className="font-mono text-[0.75rem] py-8 text-center" style={{ color: 'var(--faint)' }}>Loading…</p>
      ) : notifications.length === 0 ? (
        <p className="font-sans text-sm py-8 text-center" style={{ color: 'var(--faint)' }}>No notifications yet.</p>
      ) : (
        <div className="flex flex-col gap-0">
          {notifications.map((n, i) => (
            <div
              key={n.id}
              className="flex items-start gap-4 py-4 -mx-6 px-6 cursor-pointer transition-colors"
              style={{
                borderBottom:    i < notifications.length - 1 ? '1px solid var(--rule)' : 'none',
                borderLeft:      n.read ? '2px solid transparent' : '2px solid var(--white)',
                paddingLeft:     n.read ? '1.5rem' : 'calc(1.5rem - 2px)',
                backgroundColor: n.read ? 'transparent' : 'var(--ash)',
              }}
              onClick={() => !n.read && markOneRead(n.id)}
            >
              <span className="text-xl shrink-0 mt-0.5">{TYPE_ICONS[n.type] ?? '🔔'}</span>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-white">{n.title}</p>
                <p className="font-sans text-[0.85rem] mt-0.5" style={{ color: 'var(--muted)' }}>{n.body}</p>
                <p className="font-mono text-[0.65rem] mt-1.5" style={{ color: 'var(--faint)' }}>
                  {new Date(n.created_at).toLocaleString('en-ZA', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-white shrink-0 mt-1.5" />}
            </div>
          ))}
        </div>
      )}
    </DashboardWidget>
  )
}
