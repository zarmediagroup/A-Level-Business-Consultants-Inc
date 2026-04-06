'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'

const pageTitles: Record<string, string> = {
  '/portal':                    'Dashboard',
  '/portal/documents':          'Documents',
  '/portal/notifications':      'Notifications',
  '/portal/settings':           'Settings',
  '/portal/admin':              'Admin Overview',
  '/portal/admin/clients':      'Clients',
  '/portal/admin/documents':    'All Documents',
  '/portal/admin/audit':        'Audit Log',
}

export function PortalHeader() {
  const pathname    = usePathname()
  const { isAdmin } = useAuth()
  const title       = pageTitles[pathname] ?? 'Portal'

  const { unreadCount: unread } = useNotifications()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header
      className="flex items-center justify-between px-6 lg:px-8"
      style={{
        height: '64px', backgroundColor: 'var(--obsidian)',
        borderBottom: '1px solid var(--rule)', position: 'sticky', top: 0, zIndex: 20,
      }}
    >
      <h1 className="font-playfair text-white text-xl">{title}</h1>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <span
            className="hidden sm:flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px]"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          >
            Admin Mode
          </span>
        )}

        <ThemeToggle />

        <Link
          href="/portal/notifications"
          aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ''}`}
          className="relative w-8 h-8 flex items-center justify-center rounded-[1px] border transition-colors hover:border-white"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
        >
          🔔
          {unread > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[0.55rem] bg-white text-ink"
            >
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setShowMobileMenu(v => !v)}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[1px] border transition-colors"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: 'var(--ink)', top: '64px' }}
        >
          <nav className="flex flex-col p-6 gap-2">
            {(isAdmin ? [
              { href: '/portal/admin',           label: 'Overview' },
              { href: '/portal/admin/clients',   label: 'Clients' },
              { href: '/portal/admin/documents', label: 'All Documents' },
              { href: '/portal/admin/audit',     label: 'Audit Log' },
              { href: '/portal/notifications',   label: 'Notifications' },
              { href: '/portal/settings',        label: 'Settings' },
            ] : [
              { href: '/portal',               label: 'Dashboard' },
              { href: '/portal/documents',     label: 'Documents' },
              { href: '/portal/notifications', label: 'Notifications' },
              { href: '/portal/settings',      label: 'Settings' },
            ]).map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMobileMenu(false)}
                className="font-sans text-lg text-white py-3 border-b"
                style={{ borderColor: 'var(--rule)' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
