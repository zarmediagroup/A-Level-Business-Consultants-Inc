import { FadeUp } from '@/components/ui/FadeUp'

const results = [
  {
    region: 'Retail — Western Cape',
    stats: 'R2.1M audit value certified',
    detail: '3-year compliance backlog cleared in 6 weeks',
  },
  {
    region: 'Construction — Gauteng',
    stats: 'R8.4M turnover reconciled',
    detail: 'SARS audit successfully defended',
  },
  {
    region: 'Professional Services — KZN',
    stats: '62% reduction in accounting costs',
    detail: 'Xero migration completed',
  },
]

export function ResultsCards() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--obsidian)' }}
      aria-labelledby="results-heading"
    >
      <div className="container-main">
        <FadeUp>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
            Client Results
          </p>
          <h2
            id="results-heading"
            className="font-playfair text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.12 }}
          >
            The Work Speaks in Numbers
          </h2>
          <p className="font-mono text-[0.8rem] mb-16" style={{ color: 'var(--muted)' }}>
            Anonymised in compliance with professional standards.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: '1px solid var(--rule)' }}>
          {results.map((r, i) => (
            <FadeUp key={r.region} delay={i * 0.1}>
              <div
                className="p-8 h-full flex flex-col justify-between"
                style={{ backgroundColor: 'var(--carbon)' }}
              >
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-8" style={{ color: 'var(--muted)' }}>
                    {r.region}
                  </p>
                  <p
                    className="font-playfair text-white mb-3"
                    style={{ fontSize: '1.5rem', lineHeight: 1.2 }}
                  >
                    {r.stats}
                  </p>
                  <p className="font-sans text-sm" style={{ color: 'var(--muted)' }}>
                    {r.detail}
                  </p>
                </div>
                <div className="mt-8 h-px" style={{ backgroundColor: 'var(--rule)' }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
