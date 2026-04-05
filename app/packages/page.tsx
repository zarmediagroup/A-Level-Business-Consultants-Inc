import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { PackageCard } from '@/components/home/PackageCard'

export const metadata: Metadata = {
  title: 'Packages & Pricing',
  description: 'Transparent monthly pricing packages for individuals, sole proprietors and companies. From R295/month for personal tax to full company accounting.',
}

const individualPackages = [
  {
    tier: 'Launch',
    vatStatus: 'Non-VAT vendor',
    price: 'R295',
    period: '/month',
    highlight: false,
    features: [
      'Income Tax Return (ITR12)',
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
      'Income Tax Return (ITR12)',
      'Provisional Tax Return (IRP6)',
      'Tax audit assistance and advisory',
      'Bank reconciliations',
    ],
  },
  {
    tier: 'Growth',
    vatStatus: 'VAT vendor',
    price: 'R1,250',
    period: '/month',
    highlight: false,
    features: [
      'Income Tax Return (ITR12)',
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
    vatStatus: 'VAT vendor',
    price: 'R2,500',
    period: '/month',
    highlight: true,
    features: [
      'Bookkeeping with Xero',
      'Bi-monthly Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'VAT 201 filing',
      'CIPC Beneficial Ownership',
      'CIPC Annual Return submission',
      'Tax audit assistance and advisory',
    ],
  },
  {
    tier: 'Scale',
    vatStatus: 'VAT vendor',
    price: 'R4,495',
    period: '/month',
    highlight: false,
    features: [
      'Bookkeeping with Xero',
      'Bi-monthly Management reporting',
      'Annual financial statements',
      'Income Tax Return (ITR14)',
      'Provisional Tax Return (IRP6)',
      'VAT 201 filing',
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
        style={{ backgroundColor: 'var(--ink)', borderBottom: '1px solid var(--rule)' }}
      >
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
              Packages & Pricing
            </p>
            <h1
              className="font-playfair text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.08 }}
            >
              Transparent Pricing.<br />No Surprises.
            </h1>
            <p className="font-sans max-w-lg leading-[1.8]" style={{ color: 'var(--muted)', fontSize: '1.0625rem' }}>
              Fixed monthly fees so you always know what you&apos;re paying. Choose the package that fits your business stage.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Individual packages */}
      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)' }}>
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
              Individual / Sole Proprietor
            </p>
            <h2 className="font-playfair text-white text-3xl mb-16">Personal Tax Packages</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {individualPackages.map((pkg, i) => (
              <FadeUp key={pkg.tier} delay={i * 0.09}>
                <PackageCard pkg={pkg} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Company packages */}
      <section className="section-pad" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="container-main">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
              Company
            </p>
            <h2 className="font-playfair text-white text-3xl mb-16">Business Accounting Packages</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        style={{ backgroundColor: 'var(--obsidian)', borderTop: '1px solid var(--rule)' }}
      >
        <div className="container-main text-center">
          <FadeUp>
            <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
              Not sure which package?
            </p>
            <h2 className="font-playfair text-white text-3xl mb-5">Let Adrian Help You Choose</h2>
            <p className="font-sans mb-8 max-w-sm mx-auto" style={{ color: 'var(--muted)' }}>
              Book a free 30-minute consultation. No obligation.
            </p>
            <a
              href="https://calendly.com/adrian-abcinc/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-10 bg-white text-ink font-sans text-sm rounded-[2px] hover:bg-off-white transition-colors min-w-[240px]"
            >
              Book Free Consultation
            </a>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}
