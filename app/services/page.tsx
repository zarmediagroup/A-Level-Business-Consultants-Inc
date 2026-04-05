import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-service accounting, audit, tax compliance, bookkeeping, company secretarial and business advisory for South African businesses.',
}

const services = [
  {
    num: '01',
    title: 'Annual Financial Statements',
    outcome: 'IFRS-compliant financials, signed off by registered CA(SA)',
    what: [
      'Full IFRS/IFRS for SMEs compliance',
      'Companies Act s30 compliant preparation',
      'Director approval and sign-off process',
      'Supporting notes and disclosures',
      'Prior period comparative statements',
    ],
    standards: 'IFRS · IFRS for SMEs · Companies Act s30 · SAICA ED 2',
    description: 'Annual financial statements are the cornerstone of your business\'s financial reporting obligations. We prepare IFRS-compliant AFS for companies, trusts, close corporations and sole proprietors — signed off by our SAICA-registered accountants.',
  },
  {
    num: '02',
    title: 'Independent Audit & Review',
    outcome: 'Clean audit opinion backed by IRBA-registered professionals',
    what: [
      'Statutory independent audits',
      'Voluntary independent reviews',
      'Special purpose audit engagements',
      'SARS audit defence and representation',
      'Audit committee support',
    ],
    standards: 'ISA · ISRE 2400 · Companies Act s30 · IRBA Std 700',
    description: 'Our IRBA-registered practitioners conduct thorough, independent audits that satisfy statutory requirements and provide stakeholders with confidence. We handle the full engagement from planning through to the final report.',
  },
  {
    num: '03',
    title: 'Bookkeeping & Management Accounts',
    outcome: 'Real-time financial visibility, month-end closed on time',
    what: [
      'Monthly bookkeeping on Xero',
      'Bank reconciliations',
      'Management account packs',
      'Payroll processing',
      'Debtors and creditors management',
    ],
    standards: 'Xero Certified · SAICA bookkeeping standards',
    description: 'Disorganised books cost you money and create compliance risk. We take full ownership of your financial records — reconciling, categorising and reporting so you always know where your business stands.',
  },
  {
    num: '04',
    title: 'Tax Compliance',
    outcome: 'Every return filed on time, every year. No penalties.',
    what: [
      'Income tax returns (ITR14, ITR12)',
      'Provisional tax (IRP6)',
      'VAT201 returns',
      'PAYE and EMP501 reconciliations',
      'Tax compliance status certificates',
    ],
    standards: 'Income Tax Act · VAT Act · SARS eFiling standards',
    description: 'Tax compliance is non-negotiable. We manage every SARS obligation — income tax, VAT, PAYE and provisional tax — so nothing slips through. All submissions are reviewed before filing.',
  },
  {
    num: '05',
    title: 'Company Secretarial',
    outcome: 'CIPC-compliant, annual returns filed, corporate records maintained',
    what: [
      'Company and close corporation registration',
      'CIPC annual return submissions',
      'Beneficial ownership register',
      'Director appointment and changes',
      'Share register maintenance',
    ],
    standards: 'Companies Act 2008 · CIPC regulations',
    description: 'We handle all statutory corporate compliance from registration through to ongoing annual obligations — ensuring your company remains in good standing with CIPC at all times.',
  },
  {
    num: '06',
    title: 'Business Advisory',
    outcome: 'CFO-level financial insight without the full-time cost',
    what: [
      'Business budgeting and forecasting',
      'Cash flow modelling',
      'Financial projection for funding applications',
      'Business structure optimisation',
      'Xero setup and migration',
    ],
    standards: 'SAICA advisory standards · King IV governance principles',
    description: 'Beyond compliance, we help you build a better business. Whether you\'re seeking funding, restructuring, or just need sharper financial visibility, Adrian\'s advisory services give you the insights to make confident decisions.',
  },
]

export default function ServicesPage() {
  const tenant = defaultTenant
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
              Our Services
            </p>
            <h1
              className="font-playfair text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.08 }}
            >
              Complete Financial Compliance,<br />Handled.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, i) => (
        <section
          key={service.num}
          className="section-pad"
          style={{ backgroundColor: i % 2 === 0 ? 'var(--obsidian)' : 'var(--ink)', borderBottom: '1px solid var(--rule)' }}
          id={`service-${service.num}`}
        >
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
              <FadeUp>
                <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
                  {service.num}
                </p>
                <h2 className="font-playfair text-white text-4xl mb-4">{service.title}</h2>
                <p className="font-mono text-[0.75rem] tracking-[0.08em] mb-8" style={{ color: 'var(--profit)' }}>
                  ↗ {service.outcome}
                </p>
                <p className="font-sans leading-[1.9] mb-8" style={{ color: 'var(--muted)', fontSize: '0.9375rem' }}>
                  {service.description}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: 'var(--faint)' }}>
                  {service.standards}
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div
                  className="rounded-[1px] p-8"
                  style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
                >
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
                    What&apos;s Included
                  </p>
                  <ul className="flex flex-col gap-0">
                    {service.what.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 py-3"
                        style={{ borderBottom: j < service.what.length - 1 ? '1px solid var(--rule)' : 'none' }}
                      >
                        <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--profit)' }}>✓</span>
                        <span className="font-sans text-sm" style={{ color: 'var(--off-white)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--rule)' }}>
                    <a
                      href={tenant.calendly_url ?? '/contact'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full h-12 bg-white text-ink font-sans text-sm rounded-[1px] hover:bg-off-white transition-colors duration-200 flex items-center justify-center"
                    >
                      Enquire About This Service
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </>
  )
}
