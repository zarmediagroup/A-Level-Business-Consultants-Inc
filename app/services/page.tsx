import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'
import { BookkeepingSectionIcon, ServiceFeatureIcon, TaxComplianceIcon } from '@/components/icons/ServiceIcons'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Tax compliance, bookkeeping, payroll, company secretarial, registrations and reporting — ABC INC supports South African businesses end-to-end.',
  alternates: { canonical: '/services' },
  openGraph: { url: '/services' },
}

const taxCompliance = [
  'Accounting',
  'Payroll',
  'Company secretarial',
  'Personal tax return',
  'Company tax return',
  'Provisional tax return',
  'VAT return',
  'Tax compliance status PIN',
  'VAT registration',
  'PBO registration',
]

const bookkeepingAndMore = [
  'Accounting',
  'Annual financial statements',
  'PAYE registration',
  'UIF registration',
  'COIDA registration',
  'COIDA return of earnings',
  'Monthly payroll',
  'PAYE return',
  'Employer reconciliation return',
  'Company registration',
  'CIPC annual return',
  'Beneficial ownership',
  'Director change',
]

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0">
      {items.map((item, j) => (
        <li
          key={item + j}
          className="flex items-start gap-3 py-3"
          style={{ borderBottom: j < items.length - 1 ? '1px solid var(--rule-mid)' : 'none' }}
        >
          <ServiceFeatureIcon feature={item} highlight={false} />
          <span className="font-sans text-sm font-medium pt-0.5" style={{ color: 'var(--off-white)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function ServicesPage() {
  const tenant = defaultTenant
  return (
    <>
      <Navbar />

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
                Our Services
              </span>
            </div>
            <h1
              className="font-bebas mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                lineHeight: 1.0,
                color: 'var(--white)',
                letterSpacing: '0.02em',
              }}
            >
              Compliance &amp; reporting,{' '}
              <span style={{ color: 'var(--accent)' }}>handled.</span>
            </h1>
            <p className="font-sans max-w-2xl leading-[1.85] font-medium" style={{ color: 'var(--muted)', fontSize: '1.0625rem' }}>
              From tax filings and VAT to payroll, CIPC and annual returns — we help you stay on top of SARS and CIPC
              obligations so you can focus on running your business.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-pad" style={{ backgroundColor: 'var(--obsidian)', borderBottom: '2px solid var(--white)' }}>
        <div className="container-main">
          <div className="flex flex-col gap-8 md:gap-10">
            <FadeUp>
              <article
                className="flex flex-col overflow-hidden"
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                <div
                  className="px-7 py-4 md:px-8 flex items-center gap-4"
                  style={{ borderBottom: '2px solid var(--white)', backgroundColor: 'var(--graphite)' }}
                >
                  <TaxComplianceIcon />
                  <h2 className="font-bebas" style={{ fontSize: '2rem', color: 'var(--white)', letterSpacing: '0.04em' }}>
                    Tax compliance
                  </h2>
                </div>
                <div className="p-7 md:p-8">
                  <ServiceList items={taxCompliance} />
                </div>
              </article>
            </FadeUp>

            <FadeUp delay={0.08}>
              <article
                className="flex flex-col overflow-hidden"
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                <div
                  className="px-7 py-4 md:px-8 flex items-center gap-4"
                  style={{ borderBottom: '2px solid var(--white)', backgroundColor: 'var(--graphite)' }}
                >
                  <BookkeepingSectionIcon />
                  <h2 className="font-bebas" style={{ fontSize: '2rem', color: 'var(--white)', letterSpacing: '0.04em' }}>
                    Bookkeeping
                  </h2>
                </div>
                <div className="p-7 md:p-8">
                  <ServiceList items={bookkeepingAndMore} />
                </div>
              </article>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <div className="mt-12 md:mt-16 text-center">
              <a
                href={tenant.calendly_url ?? '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary inline-flex items-center justify-center h-12 px-8 font-sans text-sm"
              >
                Schedule a consultation →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}
