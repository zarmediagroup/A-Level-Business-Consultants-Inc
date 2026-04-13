import type { Metadata } from 'next'
import {
  Playfair_Display,
  DM_Sans,
  IBM_Plex_Mono,
  Bebas_Neue,
} from 'next/font/google'
import './globals.css'
import { defaultTenant } from '@/types/tenant'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { absoluteUrl, getSiteUrl } from '@/lib/seo'

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
const siteUrl = getSiteUrl()
/** Canonical share / JSON-LD image — dark-theme logo (default site appearance). */
const ogImagePath =
  tenant.logo_url_dark ?? tenant.logo_url ?? '/images/brand/abc-inc-chartered-accountants-south-africa-logo.png'
const logoAlt =
  tenant.logo_alt ?? `${tenant.firm_name} — chartered accountants and auditors, South Africa (official logo)`
const logoW = tenant.logo_width ?? 502
const logoH = tenant.logo_height ?? 497

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    'professional accountant South Africa',
    'bookkeeping South Africa',
    'management accounts',
    'VAT registration',
    'company secretarial',
    'Cape Town accountant',
    'chartered accountant Cape Town',
    'ABC INC',
    'ABC INC chartered accountants',
    'alevelbusinessconsultants.co.za',
    tenant.city ?? 'Cape Town',
  ],
  icons: {
    icon: [{ url: ogImagePath, type: 'image/png' }],
    apple: ogImagePath,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${tenant.firm_name} — Chartered Accountants`,
    description:
      'SAICA-registered accounting, audit and tax compliance for South African businesses.',
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: tenant.firm_name,
    images: [
      {
        url: ogImagePath,
        width: logoW,
        height: logoH,
        alt: logoAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${tenant.firm_name} — Chartered Accountants`,
    description:
      'SAICA-registered accounting, audit and tax compliance for South African businesses.',
    images: [{ url: ogImagePath, alt: logoAlt }],
  },
  robots: { index: true, follow: true },
  category: 'business',
  referrer: 'origin-when-cross-origin',
  appleWebApp: { capable: true, title: tenant.firm_name },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: tenant.firm_name,
      legalName: tenant.firm_name,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(ogImagePath),
        width: logoW,
        height: logoH,
        caption: logoAlt,
      },
      email: tenant.email,
      telephone: tenant.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: tenant.address,
        addressLocality: tenant.city,
        addressCountry: 'ZA',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: tenant.firm_name,
      inLanguage: 'en-ZA',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'AccountingService',
      '@id': `${siteUrl}/#accounting`,
      name: tenant.firm_name,
      description: 'SAICA-registered chartered accountants and auditors in South Africa.',
      url: siteUrl,
      image: {
        '@type': 'ImageObject',
        url: absoluteUrl(ogImagePath),
        width: logoW,
        height: logoH,
        caption: logoAlt,
      },
      telephone: tenant.phone,
      email: tenant.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: tenant.address,
        addressLocality: tenant.city,
        addressCountry: 'ZA',
      },
      parentOrganization: { '@id': `${siteUrl}/#organization` },
      hasCredential: ['SAICA Member', 'CIPC', 'POPIA'],
      serviceType: ['Audit', 'Accounting', 'Tax Compliance', 'Company Secretarial', 'Bookkeeping'],
      areaServed: 'South Africa',
      openingHours: 'Mo-Fr 08:30-17:00',
      priceRange: '$$',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`${playfair.variable} ${dmSans.variable} ${ibmMono.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash: .light + data-theme from localStorage before paint; ThemeProvider re-syncs after hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var l=t==='light';if(l)document.documentElement.classList.add('light');else document.documentElement.classList.remove('light');document.documentElement.setAttribute('data-theme',l?'light':'dark');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-white font-sans antialiased">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
