import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'

const services = [
  {
    num: '01',
    title: 'Annual Financial Statements',
    body: 'IFRS-compliant AFS for companies, trusts and sole props. Prepared and signed off by our SAICA-registered accountants.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="14" height="14" rx="0" />
        <line x1="5" y1="7" x2="13" y2="7" />
        <line x1="5" y1="10" x2="13" y2="10" />
        <line x1="5" y1="13" x2="10" y2="13" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Bookkeeping & Management Accounts',
    body: 'Monthly management accounts, bank reconciliations, payroll processing. Real-time financial visibility.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="14" height="14" rx="0" />
        <polyline points="5,12 7,9 10,11 13,7" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Tax Compliance',
    body: 'Income tax, VAT, PAYE, provisional tax. Every return, on time, every time — compliant with SARS requirements.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 2L3 5v5c0 3 2.5 5.5 6 6.5C15 15.5 15 15 15 10V5L9 2z" />
        <polyline points="6.5,9 8.5,11 12,7" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Company Secretarial',
    body: 'CIPC registrations, annual returns, share register maintenance, director changes — fully managed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="3" width="10" height="13" rx="0" />
        <line x1="6" y1="7" x2="12" y2="7" />
        <line x1="6" y1="10" x2="12" y2="10" />
        <line x1="6" y1="13" x2="9" y2="13" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Business Advisory',
    body: 'Budgeting, forecasting, cash flow modelling. CFO-level insight without the full-time salary.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="inline-flex items-center mb-6">
            <span
              className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-fg)',
                border: '2px solid #0A0A08',
              }}
            >
              Services
            </span>
          </div>
          <h2
            id="services-heading"
            className="font-bebas mb-12"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.05,
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            Complete Financial Compliance,<br />
            <span style={{ color: 'var(--accent)' }}>Handled.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.07}>
              <div
                className="service-card p-8 h-full flex flex-col"
                style={{ backgroundColor: 'var(--carbon)' }}
              >
                {/* Top row */}
                <div className="flex justify-between items-start mb-6">
                  <span
                    className="font-mono text-[0.65rem] tracking-[0.18em] font-bold px-2 py-1"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-fg)',
                      border: '2px solid #0A0A08',
                    }}
                  >
                    {s.num}
                  </span>
                  <span style={{ color: 'var(--accent)' }} aria-hidden="true">{s.icon}</span>
                </div>

                <h3
                  className="font-bebas mb-3 leading-tight"
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--white)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {s.title}
                </h3>
                <p className="font-sans text-sm leading-[1.7] flex-1 mb-6 font-medium" style={{ color: 'var(--muted)' }}>
                  {s.body}
                </p>

                <Link
                  href="/services"
                  className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.1em] hover:text-[var(--accent)] transition-colors duration-100"
                  style={{ color: 'var(--white)' }}
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
