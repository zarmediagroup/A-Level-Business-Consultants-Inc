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
      style={{ backgroundColor: 'var(--ink)' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-main relative">
        {/* Decorative quote */}
        <div
          className="absolute -top-4 -left-6 font-playfair leading-none select-none pointer-events-none"
          style={{ fontSize: '12rem', color: 'var(--rule)', lineHeight: 1 }}
          aria-hidden="true"
        >
          "
        </div>

        <FadeUp>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5 relative z-10" style={{ color: 'var(--muted)' }}>
            Client Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-playfair text-white mb-16 relative z-10"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.12 }}
          >
            Trusted by South African Businesses
          </h2>
        </FadeUp>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ border: '1px solid var(--rule)' }}>
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.09}>
              <div className="p-8 h-full flex flex-col" style={{ backgroundColor: 'var(--carbon)' }}>
                <blockquote className="font-playfair italic leading-[1.85] flex-1 mb-8" style={{ fontSize: '0.9375rem', color: 'var(--off-white)' }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[0.7rem] border shrink-0"
                    style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                  >
                    {t.monogram}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-white">{t.name}</p>
                    <p className="font-sans text-[0.8rem]" style={{ color: 'var(--muted)' }}>{t.role}</p>
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
              transition={{ duration: 0.3 }}
              className="p-8 rounded-[1px]"
              style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
            >
              <blockquote className="font-playfair italic leading-[1.85] mb-8" style={{ fontSize: '0.9375rem', color: 'var(--off-white)' }}>
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[0.7rem] border shrink-0"
                  style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                >
                  {testimonials[active].monogram}
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-white">{testimonials[active].name}</p>
                  <p className="font-sans text-[0.8rem]" style={{ color: 'var(--muted)' }}>{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-6 h-px transition-colors duration-200"
                style={{ backgroundColor: i === active ? 'var(--white)' : 'var(--graphite)' }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
