export const dynamic = 'force-dynamic'

import { PortalSidebar } from '@/components/layout/PortalSidebar'
import { PortalHeader } from '@/components/layout/PortalHeader'
import { AuthProvider } from '@/contexts/AuthContext'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--obsidian)' }}>
        <PortalSidebar />
        <div className="lg:ml-[240px] flex flex-col min-h-screen">
          <PortalHeader />
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
