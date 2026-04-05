'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/portal':            'Dashboard',
  '/portal/documents':  'Documents',
  '/portal/reports':    'Financial Reports',
  '/portal/deadlines':  'Deadlines',
  '/portal/messages':   'Messages',
  '/portal/settings':   'Settings',
}

export function PortalHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Portal'

  return (
    <header
      className="flex items-center justify-between px-8"
      style={{
        height: '64px',
        backgroundColor: 'var(--obsidian)',
        borderBottom: '1px solid var(--rule)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <h1 className="font-playfair text-white text-xl">{title}</h1>
      <div className="flex items-center gap-4">
        <span
          className="hidden sm:flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1.5 border rounded-[1px]"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
        >
          Tax Year: 2025
        </span>
        <span
          className="hidden md:block font-sans text-sm"
          style={{ color: 'var(--muted)' }}
        >
          Accountant: <span className="text-white">Adrian Quina CA(SA)</span>
        </span>
        <button
          aria-label="Notifications"
          className="w-8 h-8 flex items-center justify-center rounded-[1px] border transition-colors hover:border-white"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
        >
          🔔
        </button>
      </div>
    </header>
  )
}
