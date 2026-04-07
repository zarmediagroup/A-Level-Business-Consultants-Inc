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
      style={{ backgroundColor: 'var(--ink)', borderTop: '2px solid var(--white)' }}
      aria-labelledby="process-heading"
    >
      <div className="container-main">
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
              The Process
            </span>
          </div>
          <h2
            id="process-heading"
            className="font-bebas mb-16"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.05,
              color: 'var(--white)',
              letterSpacing: '0.02em',
            }}
          >
            Structured.{' '}
            <span style={{ color: 'var(--accent)' }}>Systematic.</span>{' '}
            Signed Off.
          </h2>
        </FadeUp>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          {/* Connecting line */}
          <div ref={lineRef} className="relative mb-10">
            <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--graphite)' }} />
            <motion.div
              className="absolute top-0 left-0 h-[3px]"
              style={{ backgroundColor: 'var(--accent)', transformOrigin: 'left', width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div
                  className="p-6"
                  style={{
                    border: '2px solid var(--white)',
                    backgroundColor: 'var(--carbon)',
                    boxShadow: 'var(--neo-shadow)',
                  }}
                >
                  <div
                    className="inline-flex items-center justify-center font-mono text-[0.65rem] font-bold mb-5 px-2 py-1"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#0A0A08',
                      border: '2px solid #0A0A08',
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="font-bebas mb-3"
                    style={{
                      fontSize: '1.3rem',
                      color: 'var(--white)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-[1.7] font-medium" style={{ color: 'var(--muted)' }}>
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08}>
              <div
                className="flex gap-5 p-6"
                style={{
                  border: '2px solid var(--white)',
                  backgroundColor: 'var(--carbon)',
                  boxShadow: 'var(--neo-shadow-sm)',
                }}
              >
                <div
                  className="flex items-center justify-center font-mono text-[0.65rem] font-bold shrink-0 self-start mt-0.5"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--accent)',
                    color: '#0A0A08',
                    border: '2px solid #0A0A08',
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="font-bebas mb-2"
                    style={{ fontSize: '1.25rem', color: 'var(--white)', letterSpacing: '0.04em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-[1.7] font-medium" style={{ color: 'var(--muted)' }}>
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
