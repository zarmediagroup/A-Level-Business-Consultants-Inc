export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { PortalSidebar } from '@/components/layout/PortalSidebar'
import { PortalHeader } from '@/components/layout/PortalHeader'
import { AuthProvider } from '@/contexts/AuthContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

export const metadata: Metadata = {
  title: 'Client portal',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <NotificationProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--obsidian)' }}>
        <PortalSidebar />
        <div className="lg:ml-[240px] flex flex-col min-h-screen">
          <PortalHeader />
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </NotificationProvider>
    </AuthProvider>
  )
}
