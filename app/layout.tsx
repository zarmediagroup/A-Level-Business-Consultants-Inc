import type { Metadata } from 'next'
import {
  Playfair_Display,
  DM_Sans,
  IBM_Plex_Mono,
  Bebas_Neue,
} from 'next/font/google'
import './globals.css'
import { defaultTenant } from '@/types/tenant'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const tenant = defaultTenant

export const metadata: Metadata = {
  title: {
    template: `%s | ${tenant.firm_name} — Chartered Accountants`,
    default: `${tenant.firm_name} — Chartered Accountants & Auditors`,
  },
  description: `SAICA-registered chartered accountants and auditors in South Africa. Annual financial statements, tax compliance, audit services, management accounts. ${tenant.firm_name}.`,
  keywords: [
    'chartered accountant South Africa',
    'SAICA registered accountant',
    'annual financial statements',
    'small business accounting',
    'IRBA auditor',
    'bookkeeping South Africa',
    'management accounts',
    'VAT registration',
    'company secretarial',
    'Cape Town accountant',
    'A Level Business Consultants',
  ],
  openGraph: {
    title: `${tenant.firm_name} — Chartered Accountants`,
    description: 'SAICA-registered accounting, audit and tax compliance for South African businesses.',
    type: 'website',
    locale: 'en_ZA',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: tenant.firm_name,
  description: 'SAICA-registered chartered accountants and auditors in South Africa.',
  url: 'https://alevelconsultants.co.za',
  telephone: tenant.phone,
  email: tenant.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: tenant.address,
    addressLocality: tenant.city,
    addressCountry: 'ZA',
  },
  hasCredential: ['SAICA Member', 'IRBA Registered', 'CIPC Accredited'],
  serviceType: ['Audit', 'Accounting', 'Tax Compliance', 'Company Secretarial', 'Bookkeeping'],
  areaServed: 'South Africa',
  openingHours: 'Mo-Fr 08:30-17:00',
  priceRange: '$$',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${ibmMono.variable} ${bebasNeue.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-white font-sans antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
