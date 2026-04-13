'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { BrandLogo } from '@/components/branding/BrandLogo'

const clientNav = [
  { href: '/portal',                label: 'Dashboard',    icon: '⊞' },
  { href: '/portal/documents',      label: 'Documents',    icon: '📄' },
  { href: '/portal/notifications',  label: 'Notifications', icon: '🔔' },
  { href: '/portal/settings',       label: 'Settings',     icon: '⚙' },
]

const adminNav = [
  { href: '/portal/admin',           label: 'Overview',        icon: '⊞' },
  { href: '/portal/admin/clients',   label: 'Clients',         icon: '👥' },
  { href: '/portal/admin/documents', label: 'All Documents',   icon: '📁' },
  { href: '/portal/admin/audit',     label: 'Audit Log',       icon: '🔍' },
  { href: '/portal/notifications',   label: 'Notifications',   icon: '🔔' },
  { href: '/portal/documents',       label: 'My Documents',    icon: '📄' },
  { href: '/portal/settings',        label: 'Settings',        icon: '⚙' },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { profile, isAdmin, signOut, loading } = useAuth()

  const navItems = isAdmin ? adminNav : clientNav

  const initials = profile?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '??'

  return (
    <aside
      className="hidden lg:flex flex-col h-full"
      style={{
        width: '240px', minHeight: '100vh',
        backgroundColor: 'var(--ink)',
        borderRight: '2px solid var(--white)',
        position: 'fixed', top: 0, left: 0, zIndex: 30,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '2px solid var(--white)' }}
      >
        <BrandLogo size={52} className="shrink-0" />
        <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase font-bold truncate" style={{ color: 'var(--white)' }}>
          {isAdmin ? 'Admin Portal' : 'Client Portal'}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1" aria-label="Portal navigation">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 transition-colors duration-100"
              style={{
                borderLeft:      isActive ? '3px solid var(--accent)' : '3px solid transparent',
                paddingLeft:     isActive ? 'calc(0.75rem - 3px)' : '0.75rem',
                backgroundColor: isActive ? 'var(--graphite)' : 'transparent',
                color:           isActive ? 'var(--white)' : 'var(--muted)',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-sm w-4 shrink-0 opacity-70" aria-hidden="true">{item.icon}</span>
              <span
                className="font-sans text-[0.875rem] flex-1"
                style={{ fontWeight: isActive ? '700' : '500' }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User + Sign out */}
      <div className="px-5 py-5" style={{ borderTop: '2px solid var(--white)' }}>
        {!loading && profile && (
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 flex items-center justify-center font-mono text-[0.65rem] font-bold shrink-0"
              style={{
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'var(--graphite)',
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[0.8rem] font-bold truncate" style={{ color: 'var(--white)' }}>
                {profile.full_name}
              </p>
              <p className="font-mono text-[0.6rem] truncate font-medium" style={{ color: 'var(--faint)' }}>
                {profile.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={signOut}
          className="block font-mono text-[0.65rem] tracking-[0.1em] uppercase font-bold transition-colors duration-100 hover:text-[var(--accent)]"
          style={{ color: 'var(--muted)' }}
        >
          Sign Out →
        </button>
      </div>
    </aside>
  )
}
