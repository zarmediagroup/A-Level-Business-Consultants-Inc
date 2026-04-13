'use client'

import { FadeUp } from '@/components/ui/FadeUp'
import { clientTestimonials as testimonials } from '@/lib/testimonials'

export function Testimonials() {
  return (
    <section
      className="section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--ink)', borderTop: '2px solid var(--white)' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-main relative">
        <div
          className="absolute -top-8 -right-8 pointer-events-none"
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: 'var(--accent)',
            opacity: 0.2,
          }}
          aria-hidden="true"
        />

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
              Client Testimonials
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-bebas mb-12 md:mb-16 relative z-10"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.05,
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            Trusted by South African{' '}
            <span style={{ color: 'var(--accent)' }}>Businesses</span>
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <article
                className="p-7 md:p-8 flex flex-col"
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                <div
                  className="font-bebas leading-none mb-4 select-none"
                  style={{ fontSize: '3rem', color: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <blockquote
                  className="font-sans leading-[1.75] mb-8 font-medium flex-1"
                  style={{ fontSize: '0.9375rem', color: 'var(--off-white)' }}
                >
                  {t.quote}
                </blockquote>
                <footer
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: '2px solid var(--rule-mid)' }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center font-mono text-[0.65rem] font-bold shrink-0"
                    style={{
                      border: '2px solid var(--accent)',
                      color: 'var(--accent)',
                      backgroundColor: 'var(--graphite)',
                    }}
                  >
                    {t.monogram}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-sm" style={{ color: 'var(--white)' }}>
                      {t.name}
                    </p>
                    <p className="font-sans text-[0.75rem] font-medium" style={{ color: 'var(--muted)' }}>
                      {t.role}
                    </p>
                  </div>
                </footer>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
