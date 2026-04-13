import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'

export function FinalCTA() {
  const tenant = defaultTenant
  return (
    <section
      className="section-pad"
      style={{
        backgroundColor: 'var(--accent)',
        borderTop: '3px solid #0A0A08',
      }}
      aria-labelledby="cta-heading"
    >
      <div className="container-main">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Left: text */}
            <div>
              <p
                className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-4 font-bold"
                style={{ color: 'var(--accent-fg-muted)' }}
              >
                Get Started
              </p>
              <h2
                id="cta-heading"
                className="font-bebas mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  lineHeight: 1.0,
                  color: 'var(--accent-fg)',
                  letterSpacing: '0.02em',
                }}
              >
                Let&apos;s Get Your Books Right.
              </h2>
              <p
                className="font-sans font-medium mb-0 max-w-sm"
                style={{ color: 'var(--accent-fg-muted)', fontSize: '1.0625rem' }}
              >
                Free 30-minute review. No paperwork required.
              </p>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <a
                href={tenant.calendly_url ?? '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-dark inline-flex items-center justify-center font-sans text-sm min-w-[240px]"
                style={{ height: '56px', padding: '0 2.5rem' }}
              >
                Book Your Free Review →
              </a>
              <p
                className="font-mono text-[0.65rem] tracking-[0.14em] font-bold uppercase"
                style={{ color: 'var(--accent-fg-muted)' }}
              >
                · SAICA · POPIA · Fully Confidential
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
