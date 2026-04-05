'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'

const steps = [
  {
    num: '01',
    title: 'Initial Review',
    body: 'We assess your current financial records, identify gaps, and scope the engagement.',
  },
  {
    num: '02',
    title: 'Organise & Reconcile',
    body: 'All accounts reconciled, transactions categorised, supporting documents collected and structured.',
  },
  {
    num: '03',
    title: 'Prepare & Submit',
    body: 'Financial statements prepared, returns filed, SARS submissions made — all signed off.',
  },
  {
    num: '04',
    title: 'Ongoing Support',
    body: 'Monthly accounts, real-time portal access, year-round compliance management.',
  },
]

export function ProcessTimeline() {
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section
      className="section-pad"
      style={{ backgroundColor: 'var(--ink)' }}
      aria-labelledby="process-heading"
    >
      <div className="container-main">
        <FadeUp>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
            The Process
          </p>
          <h2
            id="process-heading"
            className="font-playfair text-white mb-16"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.12 }}
          >
            Structured. Systematic. Signed Off.
          </h2>
        </FadeUp>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          {/* Connecting line */}
          <div ref={lineRef} className="relative mb-8">
            <div className="h-px w-full" style={{ backgroundColor: 'var(--graphite)' }} />
            <motion.div
              className="absolute top-0 left-0 h-px bg-white"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left', width: '100%' }}
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="pt-6">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] mb-4" style={{ color: 'var(--muted)' }}>
                    {step.num}
                  </p>
                  <h3 className="font-sans font-semibold text-white text-base mb-3">{step.title}</h3>
                  <p className="font-sans text-sm leading-[1.8]" style={{ color: 'var(--muted)' }}>
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08}>
              <div className="flex gap-6 pb-10">
                <div className="flex flex-col items-center">
                  <div
                    className="w-px flex-1"
                    style={{ backgroundColor: i > 0 ? 'var(--graphite)' : 'transparent', minHeight: '24px' }}
                  />
                  <div
                    className="w-8 h-8 flex items-center justify-center font-mono text-[0.65rem] border rounded-[1px] shrink-0 my-2"
                    style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
                  >
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1" style={{ backgroundColor: 'var(--graphite)', minHeight: '24px' }} />
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="font-sans font-semibold text-white text-base mb-2">{step.title}</h3>
                  <p className="font-sans text-sm leading-[1.8]" style={{ color: 'var(--muted)' }}>
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
