import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'

const services = [
  {
    num: '01',
    title: 'Annual Financial Statements',
    body: 'IFRS-compliant AFS for companies, trusts and sole props. Prepared and signed off by our SAICA-registered accountants.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="14" height="14" rx="1" />
        <line x1="5" y1="7" x2="13" y2="7" />
        <line x1="5" y1="10" x2="13" y2="10" />
        <line x1="5" y1="13" x2="10" y2="13" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Independent Audit & Review',
    body: 'IRBA-registered audit services. Statutory audits, voluntary reviews, special purpose engagements.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="5" />
        <line x1="12" y1="12" x2="16" y2="16" />
        <line x1="6" y1="8" x2="10" y2="8" />
        <line x1="8" y1="6" x2="8" y2="10" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Bookkeeping & Management Accounts',
    body: 'Monthly management accounts, bank reconciliations, payroll processing. Real-time financial visibility.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="14" height="14" rx="1" />
        <polyline points="5,12 7,9 10,11 13,7" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Tax Compliance',
    body: 'Income tax, VAT, PAYE, provisional tax. Every return, on time, every time — compliant with SARS requirements.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 2L3 5v5c0 3 2.5 5.5 6 6.5C15 15.5 15 15 15 10V5L9 2z" />
        <polyline points="6.5,9 8.5,11 12,7" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Company Secretarial',
    body: 'CIPC registrations, annual returns, share register maintenance, director changes — fully managed.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="10" height="13" rx="1" />
        <line x1="6" y1="7" x2="12" y2="7" />
        <line x1="6" y1="10" x2="12" y2="10" />
        <line x1="6" y1="13" x2="9" y2="13" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Business Advisory',
    body: 'Budgeting, forecasting, cash flow modelling. CFO-level insight without the full-time salary.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="7" />
        <line x1="9" y1="5" x2="9" y2="9" />
        <line x1="9" y1="9" x2="12" y2="12" />
      </svg>
    ),
  },
]

export function ServicesGrid() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--ink)' }}
      aria-labelledby="services-heading"
    >
      <div className="container-main">
        <FadeUp>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
            Services
          </p>
          <h2
            id="services-heading"
            className="font-playfair text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.12 }}
          >
            Complete Financial Compliance,<br />Handled.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: '1px solid var(--rule)' }}>
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.09}>
              <div
                className="service-card p-8 h-full flex flex-col"
                style={{ backgroundColor: 'var(--carbon)' }}
              >
                {/* Top row */}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[0.65rem] tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
                    {s.num}
                  </span>
                  <span style={{ color: 'var(--muted)' }} aria-hidden="true">{s.icon}</span>
                </div>

                <h3 className="font-playfair text-white text-xl mb-4 leading-tight">{s.title}</h3>
                <p className="font-sans text-sm leading-[1.8] flex-1 mb-6" style={{ color: 'var(--muted)' }}>
                  {s.body}
                </p>

                <Link
                  href="/services"
                  className="font-sans text-[0.8rem] text-white hover:text-off-white transition-colors duration-200"
                  aria-label={`Learn more about ${s.title}`}
                >
                  Explore →
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
