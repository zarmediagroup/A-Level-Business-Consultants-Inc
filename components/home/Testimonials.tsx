'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'

const testimonials = [
  {
    quote: 'We had an excellent experience working with Adrian from ABC Inc. His professionalism, attention to detail and clear communication made the entire process smooth and stress free. He not only handled our financial matters with precision, but also offered valuable advice that helped us make more informed decisions.',
    name: 'Managing Director',
    role: 'Deo Gloria Medical Practice Consulting (Pty) Ltd',
    monogram: 'DG',
  },
  {
    quote: 'I highly appreciate the assistance and professionalism displayed by Adrian from A-level Business Consultants.',
    name: 'Chief Executive Officer',
    role: 'Bothopele Health (Pty) Ltd',
    monogram: 'BH',
  },
  {
    quote: 'A-level Business Consultants Inc exceeded our expectations with their A-level Services. Their expertise in financial projections and tax was invaluable in applying for funding. Their professionalism, attention to detail, and timely delivery made a significant difference.',
    name: 'Chief Executive Officer',
    role: 'Thynk Unlimited (Pty) Ltd',
    monogram: 'TU',
  },
  {
    quote: 'Adrian made lightwork of the issues at hand and resolved my backlog without any hassle. He required almost no input from me, which saved me a great deal of time and effort. We are now operating within a fully automated system, with all administrative tasks running flawlessly and without stress.',
    name: 'Chief Executive Officer',
    role: 'Brooklyn Dentist (Pty) Ltd',
    monogram: 'BD',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section
      className="section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--ink)', borderTop: '2px solid var(--white)' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-main relative">
        {/* Decorative accent block */}
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
                color: '#0A0A08',
                border: '2px solid #0A0A08',
              }}
            >
              Client Testimonials
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="font-bebas mb-16 relative z-10"
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

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.09}>
              <div
                className="p-7 h-full flex flex-col"
                style={{
                  backgroundColor: 'var(--carbon)',
                  border: '2px solid var(--white)',
                  boxShadow: 'var(--neo-shadow)',
                }}
              >
                {/* Big quote mark */}
                <div
                  className="font-bebas leading-none mb-4 select-none"
                  style={{ fontSize: '3rem', color: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <blockquote
                  className="font-sans leading-[1.75] flex-1 mb-8 font-medium"
                  style={{ fontSize: '0.875rem', color: 'var(--off-white)' }}
                >
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3" style={{ borderTop: '2px solid var(--rule-mid)', paddingTop: '1rem' }}>
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
                    <p className="font-sans font-bold text-sm" style={{ color: 'var(--white)' }}>{t.name}</p>
                    <p className="font-sans text-[0.75rem] font-medium" style={{ color: 'var(--muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-7"
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
                className="font-sans leading-[1.75] mb-8 font-medium"
                style={{ fontSize: '0.9375rem', color: 'var(--off-white)' }}
              >
                {testimonials[active].quote}
              </blockquote>
              <div className="flex items-center gap-3" style={{ borderTop: '2px solid var(--rule-mid)', paddingTop: '1rem' }}>
                <div
                  className="w-10 h-10 flex items-center justify-center font-mono text-[0.65rem] font-bold shrink-0"
                  style={{
                    border: '2px solid var(--accent)',
                    color: 'var(--accent)',
                    backgroundColor: 'var(--graphite)',
                  }}
                >
                  {testimonials[active].monogram}
                </div>
                <div>
                  <p className="font-sans font-bold text-sm" style={{ color: 'var(--white)' }}>{testimonials[active].name}</p>
                  <p className="font-sans text-[0.8rem] font-medium" style={{ color: 'var(--muted)' }}>{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-[3px] transition-all duration-150"
                style={{
                  width: i === active ? '32px' : '16px',
                  backgroundColor: i === active ? 'var(--accent)' : 'var(--graphite)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
