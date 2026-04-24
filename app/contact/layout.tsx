import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { CONTACT_FAQS } from '@/data/contact-faqs'
import { breadcrumbListJsonLd, faqPageJsonLd } from '@/lib/schema'
import { defaultTenant } from '@/types/tenant'

const tenant = defaultTenant

const ogDescription = `Book a consultation, call or email ${tenant.firm_name} — SAICA-registered chartered accountants in Cape Town serving clients across South Africa.`

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${tenant.firm_name} — chartered accountants in Cape Town. Book a call, email or phone for tax, accounting and compliance.`,
  alternates: {
    canonical: '/contact',
    languages: { 'en-ZA': '/contact' },
  },
  openGraph: {
    title: `Contact ${tenant.firm_name}`,
    description: ogDescription,
    url: '/contact',
    type: 'website',
    locale: 'en_ZA',
    siteName: tenant.firm_name,
    images: [
      {
        url: tenant.logo_url_dark ?? tenant.logo_url ?? '/images/brand/abc-inc-logo-dark.png',
        width: tenant.logo_width ?? 502,
        height: tenant.logo_height ?? 497,
        alt: tenant.logo_alt ?? `${tenant.firm_name} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact ${tenant.firm_name}`,
    description: ogDescription,
    images: [tenant.logo_url_dark ?? tenant.logo_url ?? '/images/brand/abc-inc-logo-dark.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const breadcrumb = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
])
const faqLd = faqPageJsonLd(CONTACT_FAQS)

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqLd} />
      {children}
    </>
  )
}
