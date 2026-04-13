'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clientTestimonials } from '@/lib/testimonials'

export function AboutTestimonials() {
  const [i, setI] = useState(0)
  const n = clientTestimonials.length
  const t = clientTestimonials[i]

  return (
    <section className="section-pad" style={{ backgroundColor: 'var(--ink)', borderBottom: '2px solid var(--white)' }}>
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10">
          <span
            className="inline-block font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5 mb-6"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)', border: '2px solid #0A0A08' }}
          >
            Testimonials
          </span>
          <h2
            className="font-bebas"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', letterSpacing: '0.02em' }}
          >
            What clients say
          </h2>
        </div>

        <div
          className="relative overflow-hidden p-8 md:p-10"
          style={{
            backgroundColor: 'var(--carbon)',
            border: '2px solid var(--white)',
            boxShadow: 'var(--neo-shadow-lg)',
            minHeight: '320px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-bebas leading-none mb-4 select-none" style={{ fontSize: '3rem', color: 'var(--accent)' }} aria-hidden>
                &ldquo;
              </div>
              <blockquote className="font-sans leading-[1.85] font-medium mb-8" style={{ fontSize: '1rem', color: 'var(--off-white)' }}>
                {t.quote}
              </blockquote>
              <footer>
                <p className="font-sans font-bold" style={{ color: 'var(--white)' }}>
                  {t.name}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.08em] mt-1" style={{ color: 'var(--muted)' }}>
                  {t.role}
                </p>
              </footer>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-4 mt-10 pt-6" style={{ borderTop: '2px solid var(--rule-mid)' }}>
            <button
              type="button"
              onClick={() => setI(prev => (prev - 1 + n) % n)}
              className="neo-btn-outline px-4 py-2 font-mono text-[0.65rem] uppercase font-bold"
              aria-label="Previous testimonial"
            >
              ← Prev
            </button>
            <div className="flex gap-2">
              {clientTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  className="w-2.5 h-2.5 border-2 transition-colors"
                  style={{
                    backgroundColor: idx === i ? 'var(--accent)' : 'transparent',
                    borderColor: idx === i ? '#0A0A08' : 'var(--muted)',
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === i ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setI(prev => (prev + 1) % n)}
              className="neo-btn-outline px-4 py-2 font-mono text-[0.65rem] uppercase font-bold"
              aria-label="Next testimonial"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
