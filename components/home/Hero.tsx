'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'

const headlineLines = ['The Numbers', "Don't Lie.", 'Ours Never Do.']

const ledgerRows = [
  { label: 'Revenue Recognised',  value: 'R  4,820,000', color: 'var(--white)' },
  { label: 'Deductible Expenses', value: 'R  1,640,000', color: 'var(--white)' },
  { label: 'Taxable Income',      value: 'R  3,180,000', color: 'var(--white)' },
  { label: 'Tax Provision',       value: 'R    861,300', color: 'var(--pending)' },
  { label: 'Effective Rate',      value: '       27.1%', color: 'var(--white)' },
  { label: 'SARS Status',         value: '● COMPLIANT',  color: 'var(--profit)' },
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [start, target, duration])

  return value
}

export function Hero() {
  const [counterStarted, setCounterStarted] = useState(false)
  const tenant = defaultTenant
  const count = useCountUp(48, 2200, counterStarted)

  useEffect(() => {
    const timer = setTimeout(() => setCounterStarted(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
      aria-label="Hero"
    >
      {/* Neobrutalism grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent corner block */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: 'var(--accent)',
          opacity: 0.15,
        }}
      />

      <div className="container-main relative z-10 w-full py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center min-h-[100dvh]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-center lg:pr-12">
            {/* Overline badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-fg)',
                  border: '2px solid #0A0A08',
                }}
              >
                Chartered Accountants · SAICA · IRBA
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-bebas leading-[1.0] mb-8"
              style={{
                fontSize: 'clamp(4rem, 8vw, 8rem)',
                color: 'var(--white)',
                letterSpacing: '0.02em',
              }}
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  style={{ display: 'block' }}
                >
                  {i === 1 ? (
                    <span style={{ color: 'var(--accent)' }}>{line}</span>
                  ) : line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="font-sans leading-[1.7] max-w-[440px] mb-10 font-medium"
              style={{ fontSize: '1.0625rem', color: 'var(--muted)' }}
            >
              Audit, accounting, and tax compliance for South African businesses
              that demand accuracy. SAICA-registered. IRBA-approved. Zero tolerance for error.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={tenant.calendly_url ?? '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn-primary inline-flex items-center justify-center h-12 px-7 font-sans text-sm"
              >
                Schedule a Consultation →
              </a>
              <Link
                href="/services"
                className="neo-btn-outline inline-flex items-center justify-center h-12 px-7 font-sans text-sm"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Ledger panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden lg:block"
          >
            <div
              style={{
                backgroundColor: 'var(--carbon)',
                border: '2px solid var(--white)',
                boxShadow: 'var(--neo-shadow-lg)',
              }}
            >
              {/* Header row */}
              <div
                className="flex justify-between items-center px-6 py-4"
                style={{
                  borderBottom: '2px solid var(--white)',
                  backgroundColor: 'var(--accent)',
                }}
              >
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold" style={{ color: 'var(--accent-fg)' }}>
                  Financial Review Summary
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.18em] font-bold" style={{ color: 'var(--accent-fg)' }}>
                  FY 2025
                </span>
              </div>

              {/* Animated ledger rows */}
              <div className="flex flex-col">
                {ledgerRows.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                    className="flex justify-between items-center px-6 py-3"
                    style={{
                      borderBottom: i < ledgerRows.length - 1 ? '1px solid var(--rule-mid)' : 'none',
                    }}
                  >
                    <span className="font-sans text-[0.875rem] font-medium" style={{ color: 'var(--muted)' }}>
                      {row.label}
                    </span>
                    <span className="font-mono text-[0.9rem] font-bold" style={{ color: row.color }}>
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Big stat */}
              <div style={{ borderTop: '2px solid var(--white)' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  className="text-center py-6 px-6"
                  style={{ borderBottom: '2px solid var(--white)' }}
                >
                  <p
                    className="font-bebas leading-none"
                    style={{ fontSize: '5rem', color: 'var(--accent)' }}
                  >
                    R{count}M+
                  </p>
                  <p className="font-mono text-[0.7rem] tracking-[0.12em] mt-1 font-bold uppercase" style={{ color: 'var(--muted)' }}>
                    Audit Value Certified · 2025
                  </p>
                </motion.div>

                {/* Credential badges */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.3 }}
                  className="flex justify-center gap-0 flex-wrap p-4"
                >
                  {['SAICA Member', 'IRBA Registered', 'CIPC Accredited'].map((badge, i, arr) => (
                    <span
                      key={badge}
                      className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1.5 font-bold uppercase"
                      style={{
                        border: '2px solid var(--white)',
                        color: 'var(--white)',
                        marginLeft: i > 0 ? '-2px' : 0,
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
        style={{ animation: 'pulseDown 2s ease-in-out infinite' }}
      >
        <div className="w-[2px] h-10" style={{ backgroundColor: 'var(--accent)' }} />
        <div
          className="w-2 h-2"
          style={{
            backgroundColor: 'var(--accent)',
            clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
          }}
        />
      </motion.div>
    </section>
  )
}
