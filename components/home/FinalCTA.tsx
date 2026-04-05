import { FadeUp } from '@/components/ui/FadeUp'
import { defaultTenant } from '@/types/tenant'

export function FinalCTA() {
  const tenant = defaultTenant
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--obsidian)', borderTop: '1px solid var(--rule)' }}
      aria-labelledby="cta-heading"
    >
      <div className="container-main text-center">
        <FadeUp>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--muted)' }}>
            Get Started
          </p>
          <h2
            id="cta-heading"
            className="font-playfair text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Let&apos;s Get Your Books Right.
          </h2>
          <p className="font-sans mb-10 max-w-sm mx-auto" style={{ color: 'var(--muted)', fontSize: '1.0625rem' }}>
            Free 30-minute review. No paperwork required.
          </p>
          <a
            href={tenant.calendly_url ?? '/contact'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-ink font-sans text-sm tracking-wide rounded-[2px] hover:bg-off-white transition-colors duration-200 min-w-[240px]"
            style={{ height: '56px', padding: '0 2rem' }}
          >
            Book Your Free Review
          </a>
          <p className="font-mono text-[0.7rem] tracking-[0.12em] mt-8" style={{ color: 'var(--faint)' }}>
            · SAICA REGISTERED  · IRBA APPROVED  · POPIA COMPLIANT  · FULLY CONFIDENTIAL
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
