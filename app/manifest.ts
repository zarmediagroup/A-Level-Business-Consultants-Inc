import type { MetadataRoute } from 'next'
import { defaultTenant } from '@/types/tenant'

export default function manifest(): MetadataRoute.Manifest {
  const t = defaultTenant
  return {
    name: `${t.firm_name} — Chartered Accountants`,
    short_name: t.firm_name,
    description:
      'SAICA-registered chartered accountants and auditors in South Africa — tax, bookkeeping, compliance and advisory.',
    start_url: '/',
    display: 'browser',
    background_color: '#0C0C0A',
    theme_color: '#0C0C0A',
    lang: 'en-ZA',
    categories: ['business', 'finance'],
  }
}
