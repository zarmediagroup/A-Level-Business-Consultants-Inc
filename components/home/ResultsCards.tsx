import { FadeUp } from '@/components/ui/FadeUp'

const results = [
  {
    region: 'Retail — Western Cape',
    headline: 'Compliance & reporting',
    detail: 'Annual financial statements and tax filings brought current — illustrative scenario, anonymised.',
  },
  {
    region: 'Construction — Gauteng',
    headline: 'Records & reconciliations',
    detail: 'Bookkeeping and documentation organised for year-end and SARS engagement — illustrative scenario, anonymised.',
  },
  {
    region: 'Professional services — KZN',
    headline: 'Systems & efficiency',
    detail: 'Cloud accounting migration and payroll alignment — illustrative scenario, anonymised.',
  },
]

export function ResultsCards() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--obsidian)', borderTop: '2px solid var(--white)' }}
      aria-labelledby="results-heading"
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
              How we help
            </span>
          </div>
          <h2
            id="results-heading"
            className="font-bebas mb-3"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.05,
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            Illustrative engagement types
          </h2>
          <p className="font-mono text-[0.75rem] mb-16 font-medium" style={{ color: 'var(--muted)' }}>
            Anonymised scenarios — not verified results or performance claims.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <FadeUp key={r.region} delay={i * 0.1}>
              <div
                className="p-8 h-full flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                <div>
                  <p
                    className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold mb-6 px-2 py-1 self-start inline-block"
                    style={{
                      backgroundColor: 'var(--graphite)',
                      color: 'var(--muted)',
                      border: '1px solid var(--rule-mid)',
                    }}
                  >
                    {r.region}
                  </p>
                  <p
                    className="font-bebas mb-3"
                    style={{
                      fontSize: '2rem',
                      lineHeight: 1.1,
                      color: 'var(--accent)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {r.headline}
                  </p>
                  <p className="font-sans text-sm font-medium" style={{ color: 'var(--muted)' }}>
                    {r.detail}
                  </p>
                </div>
                <div
                  className="mt-8 h-[3px]"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
