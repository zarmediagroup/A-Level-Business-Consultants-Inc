import type { Metadata } from 'next'
import { defaultTenant } from '@/types/tenant'

const tenant = defaultTenant

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${tenant.firm_name} — chartered accountants in Cape Town. Book a call, email or phone for tax, accounting and compliance.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact ${tenant.firm_name}`,
    description: `Reach ${tenant.firm_name} for accounting, tax and compliance in South Africa.`,
    url: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
