'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { defaultTenant } from '@/types/tenant'

const headlineLines = ['The Numbers', "Don't Lie.", 'Ours Never Do.']

/** Realistic engagement snapshot — process wording only (no illustrative financial amounts). */
const engagementRows = [
  { label: 'Engagement letter & scope', detail: 'Roles, timelines and fees agreed up front.' },
  { label: 'Records & information', detail: 'We work from your books, bank feeds and supporting docs.' },
  { label: 'Reporting & filings', detail: 'Annual financial statements, tax and CIPC — as agreed.' },
  { label: 'Queries & sign-off', detail: 'Review drafts with you before SARS / CIPC submission.' },
]

export function Hero() {
  const tenant = defaultTenant

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-[var(--nav-height)]"
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

      <div className="container-main relative z-10 w-full py-10 sm:py-14 lg:py-6">
        <div className="grid min-h-0 grid-cols-1 items-center gap-12 lg:min-h-[calc(100dvh-var(--nav-height))] lg:grid-cols-[55%_45%] lg:gap-8">

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
                Chartered Accountants · SAICA
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
              that demand accuracy. SAICA-registered practice — professional standards, clearly applied.
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

          {/* ── RIGHT COLUMN — Engagement snapshot (process, not sample financials) ── */}
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
              <div
                className="flex justify-between items-start gap-4 px-6 py-4"
                style={{
                  borderBottom: '2px solid var(--white)',
                  backgroundColor: 'var(--accent)',
                }}
              >
                <div className="flex flex-col items-start gap-1 min-w-0">
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold" style={{ color: 'var(--accent-fg)' }}>
                    How we work with you
                  </span>
                  <span className="font-sans text-[0.8125rem] leading-snug font-medium" style={{ color: 'var(--accent-fg-muted)' }}>
                    A typical professional relationship — scoped in writing, no placeholder “results” on this page.
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] tracking-[0.12em] font-bold uppercase shrink-0 pt-0.5" style={{ color: 'var(--accent-fg-muted)' }}>
                  {tenant.city?.split(',')[0] ?? 'Cape Town'}
                </span>
              </div>

              <div className="flex flex-col px-6 py-2">
                {engagementRows.map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.08, duration: 0.3 }}
                    className="py-4"
                    style={{
                      borderBottom: i < engagementRows.length - 1 ? '1px solid var(--rule-mid)' : 'none',
                    }}
                  >
                    <p className="font-sans text-[0.875rem] font-bold mb-1" style={{ color: 'var(--white)' }}>
                      {row.label}
                    </p>
                    <p className="font-sans text-[0.8125rem] leading-[1.55] font-medium" style={{ color: 'var(--muted)' }}>
                      {row.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid var(--white)' }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.05, duration: 0.45 }}
                  className="text-center py-5 px-6"
                  style={{ borderBottom: '2px solid var(--white)' }}
                >
                  <p
                    className="font-bebas leading-tight px-2"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--accent)' }}
                  >
                    Annual financial statements · Tax · CIPC
                  </p>
                  <p className="font-mono text-[0.65rem] tracking-[0.1em] mt-2 font-bold uppercase" style={{ color: 'var(--muted)' }}>
                    Clarity, compliance, confidentiality
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.3 }}
                  className="flex justify-center gap-0 flex-wrap p-4"
                >
                  {['SAICA', 'CIPC', 'POPIA'].map((badge, i) => (
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
