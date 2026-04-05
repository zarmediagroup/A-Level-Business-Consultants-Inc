'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'

const headlineLines = ['The Numbers', "Don't Lie.", 'Ours Never Do.']

const ledgerRows = [
  { label: 'Revenue Recognised',  value: 'R  4,820,000', color: 'var(--off-white)' },
  { label: 'Deductible Expenses', value: 'R  1,640,000', color: 'var(--off-white)' },
  { label: 'Taxable Income',      value: 'R  3,180,000', color: 'var(--off-white)' },
  { label: 'Tax Provision',       value: 'R    861,300', color: 'var(--pending)' },
  { label: 'Effective Rate',      value: '       27.1%', color: 'var(--off-white)' },
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
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-main relative z-10 w-full py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 lg:gap-0 items-center min-h-[100dvh]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col justify-center lg:pr-16">
            {/* Overline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-8"
              style={{ color: 'var(--muted)' }}
            >
              Chartered Accountants · SAICA Members · IRBA Registered
            </motion.p>

            {/* Headline */}
            <h1
              className="font-playfair text-white leading-[1.08] mb-8"
              style={{ fontSize: 'clamp(3.25rem, 6vw, 6.5rem)' }}
            >
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'block' }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans leading-[1.8] max-w-[440px] mb-10"
              style={{ fontSize: '1.0625rem', color: 'var(--muted)' }}
            >
              Audit, accounting, and tax compliance for South African businesses
              that demand accuracy. SAICA-registered. IRBA-approved. Zero tolerance for error.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={tenant.calendly_url ?? '/contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-7 bg-white text-ink font-sans text-sm tracking-wide rounded-[2px] hover:bg-off-white transition-colors duration-200"
              >
                Schedule a Consultation
              </a>
              <Link
                href="/services"
                className="group inline-flex items-center gap-1 font-sans text-sm text-white relative pb-0.5 hover:text-off-white transition-colors duration-200"
              >
                Our Services →
                <span
                  className="absolute bottom-0 right-0 w-0 group-hover:w-full h-px bg-white transition-all duration-300"
                  style={{ transformOrigin: 'right' }}
                />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Ledger panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div
              className="rounded-[1px] p-6"
              style={{
                backgroundColor: 'var(--carbon)',
                border: '1px solid var(--rule)',
              }}
            >
              {/* Header row */}
              <div className="flex justify-between items-center pb-4" style={{ borderBottom: '1px solid var(--rule)' }}>
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
                  Financial Review Summary
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
                  FY 2025
                </span>
              </div>

              {/* Animated ledger rows */}
              <div className="py-4 flex flex-col gap-1">
                {ledgerRows.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
                    className="flex justify-between items-center py-2.5 px-1"
                    style={{ borderBottom: i < ledgerRows.length - 1 ? '1px solid var(--rule)' : 'none' }}
                  >
                    <span className="font-sans text-[0.875rem]" style={{ color: 'var(--muted)' }}>
                      {row.label}
                    </span>
                    <span className="font-mono text-[0.9rem]" style={{ color: row.color }}>
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--rule)' }} className="pt-6">
                {/* Big stat */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <p
                    className="font-bebas text-white leading-none"
                    style={{ fontSize: '4.5rem' }}
                  >
                    R{count}M+
                  </p>
                  <p className="font-mono text-[0.7rem] tracking-[0.1em] mt-1" style={{ color: 'var(--muted)' }}>
                    audit value certified · 2025
                  </p>
                </motion.div>

                {/* Credential badges */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.4 }}
                  className="flex justify-center gap-2 flex-wrap"
                >
                  {['SAICA Member', 'IRBA Registered', 'CIPC Accredited'].map(badge => (
                    <span
                      key={badge}
                      className="font-mono text-[0.65rem] tracking-[0.1em] px-2 py-1 border rounded-[1px]"
                      style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
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
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1"
        aria-hidden="true"
        style={{ animation: 'pulseDown 2s ease-in-out infinite' }}
      >
        <div className="w-px h-12" style={{ backgroundColor: 'var(--muted)' }} />
        <div className="w-px h-12" style={{ backgroundColor: 'var(--muted)' }} />
      </motion.div>
    </section>
  )
}
