import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { MarqueeTrustBar } from '@/components/home/MarqueeTrustBar'
import { Calculator } from '@/components/home/Calculator'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { TrustMetrics } from '@/components/home/TrustMetrics'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { ResultsCards } from '@/components/home/ResultsCards'
import { Testimonials } from '@/components/home/Testimonials'
import { FinalCTA } from '@/components/home/FinalCTA'
import { defaultTenant } from '@/types/tenant'

const tenant = defaultTenant

const homeOgDescription =
  'Tax, bookkeeping, payroll and compliance for South African businesses — clarity, SAICA standards, long-term partnership.'

export const metadata: Metadata = {
  title: 'Home',
  description: `${tenant.firm_name} — Cape Town chartered accountants and auditors. Tax, bookkeeping, payroll, company secretarial and compliance for individuals and SMEs across South Africa.`,
  alternates: { canonical: '/', languages: { 'en-ZA': '/' } },
  openGraph: {
    title: `${tenant.firm_name} — Chartered Accountants & Auditors`,
    description: homeOgDescription,
    url: '/',
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
    title: `${tenant.firm_name} — Chartered Accountants & Auditors`,
    description: homeOgDescription,
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeTrustBar />
      <Calculator />
      <ServicesGrid />
      <TrustMetrics />
      <ProcessTimeline />
      <ResultsCards />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  )
}
