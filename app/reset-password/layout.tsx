import type { Metadata } from 'next'
import { defaultTenant } from '@/types/tenant'

const tenant = defaultTenant

export const metadata: Metadata = {
  title: 'Reset password',
  description: `Set a new password for your ${tenant.firm_name} client account.`,
  robots: { index: false, follow: false },
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}
