import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { PackageCard } from '@/components/home/PackageCard'
import { CompanyPackagesIcon, IndividualPackagesIcon } from '@/components/icons/ServiceIcons'

export const metadata: Metadata = {
  title: 'Packages & Pricing',
  description: 'Transparent monthly pricing packages for individuals, sole proprietors and companies. From R295/month for personal tax to full company accounting.',
  alternates: { canonical: '/packages' },
  openGraph: { url: '/packages' },
}

const individualPackages = [
  {
    tier: 'Launch',
    vatStatus: 'Non-VAT vendor',
    price: 'R295',
    period: '/month',
    highlight: false,
    features: [
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'Tax audit assistance and advisory',
      'Bank reconciliations',
    ],
  },
  {
    tier: 'Accelerate',
    vatStatus: 'Non-VAT vendor',
    price: 'R800',
    period: '/month',
    highlight: true,
    features: [
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'Tax audit assistance and advisory',
      'Bank reconciliations',
    ],
  },
  {
    tier: 'Growth',
    vatStatus: 'VAT Vendor',
    price: 'R1,250',
    period: '/month',
    highlight: false,
    features: [
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'File VAT 201',
      'Tax audit assistance and advisory',
    ],
  },
]

const companyPackages = [
  {
    tier: 'Launch',
    vatStatus: 'Non-VAT vendor',
    price: 'R1,250',
    period: '/month',
    highlight: false,
    features: [
      'Bookkeeping with Xero',
      'Bi-annual Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'CIPC Beneficial Ownership',
      'CIPC Annual Return submission',
      'Tax audit assistance and advisory',
    ],
  },
  {
    tier: 'Accelerate',
    vatStatus: 'Non-VAT vendor',
    price: 'R1,750',
    period: '/month',
    highlight: false,
    features: [
      'Bookkeeping with Xero',
      'Quarterly Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'CIPC Beneficial Ownership',
      'CIPC Annual Return submission',
      'Tax audit assistance and advisory',
    ],
  },
  {
    tier: 'Growth',
    vatStatus: 'VAT Vendor',
    price: 'R2,500',
    period: '/month',
    highlight: true,
    features: [
      'Bookkeeping with Xero',
      'Bi-monthly Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'VAT 201',
      'CIPC Beneficial Ownership',
      'CIPC Annual Return submission',
      'Tax audit assistance and advisory',
    ],
  },
  {
    tier: 'Scale',
    vatStatus: 'VAT Vendor',
    price: 'R4,495',
    period: '/month',
    highlight: false,
    features: [
      'Bookkeeping with Xero',
      'Bi-monthly Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'VAT 201',
      'CIPC Beneficial Ownership',
      'CIPC Annual Return submission',
      'Tax audit assistance and advisory',
    ],
  },
]

export default function PackagesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-40 pb-24"
        style={{ backgroundColor: 'var(--ink)', borderBottom: '2px solid var(--white)' }}
      >
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-6">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                Packages &amp; Pricing
              </span>
            </div>
            <h1
              className="font-bebas mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 1.0, color: 'var(--white)', letterSpacing: '0.02em' }}
            >
              Transparent Pricing.{' '}
              <span style={{ color: 'var(--accent)' }}>No Surprises.</span>
            </h1>
            <p className="font-sans max-w-lg leading-[1.8] font-medium" style={{ color: 'var(--muted)', fontSize: '1.0625rem' }}>
              Fixed monthly fees so you always know what you&apos;re paying. Choose the package that fits your business stage.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Individual packages */}
      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)', borderBottom: '2px solid var(--white)' }}>
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-4">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                Individual / Sole Proprietor
              </span>
            </div>
            <div className="flex items-center gap-4 mb-16">
              <IndividualPackagesIcon />
              <h2
                className="font-bebas"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)', letterSpacing: '0.02em' }}
              >
                Personal Tax Packages
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {individualPackages.map((pkg, i) => (
              <FadeUp key={pkg.tier} delay={i * 0.09}>
                <PackageCard pkg={pkg} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Company packages */}
      <section className="section-pad" style={{ backgroundColor: 'var(--ink)', borderBottom: '2px solid var(--white)' }}>
        <div className="container-main">
          <FadeUp>
            <div className="inline-flex items-center mb-4">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
              >
                Company
              </span>
            </div>
            <div className="flex items-center gap-4 mb-16">
              <CompanyPackagesIcon />
              <h2
                className="font-bebas"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)', letterSpacing: '0.02em' }}
              >
                Business Accounting Packages
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyPackages.map((pkg, i) => (
              <FadeUp key={pkg.tier} delay={i * 0.09}>
                <PackageCard pkg={pkg} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--accent)', borderTop: '2px solid #0A0A08' }}
      >
        <div className="container-main text-center">
          <FadeUp>
            <p
              className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5 font-bold"
              style={{ color: '#3A3A30' }}
            >
              Not sure which package?
            </p>
            <h2
              className="font-bebas mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: 'var(--accent-fg)', letterSpacing: '0.02em', lineHeight: 1.0 }}
            >
              Let Adrian Help You Choose
            </h2>
            <p className="font-sans mb-8 max-w-sm mx-auto font-medium" style={{ color: '#3A3A30' }}>
              Book a free 30-minute consultation. No obligation.
            </p>
            <a
              href="https://calendly.com/adrian-abcinc/30min?month=2026-04"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn-dark inline-flex items-center justify-center h-14 px-10 font-sans text-sm min-w-[240px]"
            >
              Book Free Consultation →
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}
