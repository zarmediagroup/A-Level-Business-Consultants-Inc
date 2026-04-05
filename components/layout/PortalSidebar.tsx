'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

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
        backgroundColor: 'var(--ink)', borderRight: '1px solid var(--rule)',
        position: 'fixed', top: 0, left: 0, zIndex: 30,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div
          className="flex items-center justify-center border rounded-[1px] font-mono text-[0.6rem] tracking-[0.18em] uppercase shrink-0"
          style={{ width: '32px', height: '28px', borderColor: 'var(--rule-mid)', color: 'var(--white)' }}
        >
          ALC
        </div>
        <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase truncate" style={{ color: 'var(--muted)' }}>
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-[1px] transition-colors duration-200"
              style={{
                borderLeft:      isActive ? '2px solid var(--white)' : '2px solid transparent',
                paddingLeft:     isActive ? 'calc(0.75rem - 2px)' : '0.75rem',
                backgroundColor: isActive ? 'var(--carbon)' : 'transparent',
                color:           isActive ? 'var(--white)' : 'var(--muted)',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="text-sm w-4 shrink-0 opacity-70" aria-hidden="true">{item.icon}</span>
              <span className="font-sans text-[0.9375rem] flex-1">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User + Sign out */}
      <div className="px-6 py-5" style={{ borderTop: '1px solid var(--rule)' }}>
        {!loading && profile && (
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[0.65rem] border shrink-0"
              style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-sans text-[0.8rem] text-white truncate">{profile.full_name}</p>
              <p className="font-mono text-[0.6rem] truncate" style={{ color: 'var(--faint)' }}>{profile.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={signOut}
          className="block font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-200 hover:text-white"
          style={{ color: 'var(--faint)' }}
        >
          Sign Out →
        </button>
      </div>
    </aside>
  )
}
