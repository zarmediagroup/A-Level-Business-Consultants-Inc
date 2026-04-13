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

export const metadata: Metadata = {
  title: 'Home',
  description: `${tenant.firm_name} — Cape Town chartered accountants and auditors. Tax, bookkeeping, payroll, company secretarial and compliance for individuals and SMEs across South Africa.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${tenant.firm_name} — Chartered Accountants & Auditors`,
    description:
      'Tax, bookkeeping, payroll and compliance for South African businesses — clarity, SAICA standards, long-term partnership.',
    url: '/',
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
