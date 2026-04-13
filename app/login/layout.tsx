import type { Metadata } from 'next'
import { defaultTenant } from '@/types/tenant'

const tenant = defaultTenant

export const metadata: Metadata = {
  title: 'Client sign in',
  description: `Secure client portal sign-in for ${tenant.firm_name}.`,
  robots: { index: false, follow: false },
  openGraph: {
    title: `Sign in — ${tenant.firm_name}`,
    url: '/login',
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
