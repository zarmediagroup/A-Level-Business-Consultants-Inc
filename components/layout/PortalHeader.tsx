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
        height: '64px',
        backgroundColor: 'var(--obsidian)',
        borderBottom: '2px solid var(--white)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <h1
        className="font-bebas"
        style={{
          fontSize: '1.5rem',
          color: 'var(--white)',
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </h1>

      <div className="flex items-center gap-3">
        {isAdmin && (
          <span
            className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.1em] uppercase px-2.5 py-1 font-bold"
            style={{
              border: '2px solid var(--accent)',
              color: 'var(--accent)',
              backgroundColor: 'var(--graphite)',
            }}
          >
            Admin
          </span>
        )}

        <ThemeToggle />

        <Link
          href="/portal/notifications"
          aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ''}`}
          className="relative w-9 h-9 flex items-center justify-center transition-all duration-80"
          style={{
            border: '2px solid var(--white)',
            color: 'var(--muted)',
            boxShadow: 'var(--neo-shadow-sm)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
            ;(e.currentTarget as HTMLElement).style.transform = 'translate(2px, 2px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'var(--neo-shadow-sm)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)'
          }}
        >
          🔔
          {unread > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center font-mono text-[0.55rem] font-bold"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-fg)',
                border: '2px solid #0A0A08',
              }}
            >
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setShowMobileMenu(v => !v)}
          className="lg:hidden w-9 h-9 flex items-center justify-center font-bold"
          style={{
            border: '2px solid var(--white)',
            color: 'var(--white)',
            backgroundColor: showMobileMenu ? 'var(--accent)' : 'transparent',
          }}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col"
          style={{
            backgroundColor: 'var(--ink)',
            top: '64px',
            borderTop: '2px solid var(--white)',
          }}
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
                className="font-bebas py-4 transition-colors duration-100 hover:text-[var(--accent)]"
                style={{
                  fontSize: '1.75rem',
                  color: 'var(--white)',
                  letterSpacing: '0.04em',
                  borderBottom: '2px solid var(--rule-mid)',
                }}
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
