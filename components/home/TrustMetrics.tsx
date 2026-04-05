'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface MetricProps {
  target: number
  suffix: string
  unit?: string
  label: string
  sublabel: string
  isLast?: boolean
}

function CountUpMetric({ target, suffix, unit, label, sublabel, isLast }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, target])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center py-12 px-8"
      style={!isLast ? { borderRight: '1px solid var(--rule)' } : {}}
    >
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className="font-bebas text-white leading-none"
          style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
        >
          {unit && <span className="font-playfair italic text-2xl text-muted mr-1">{unit}</span>}
          {value}{suffix}
        </span>
      </div>
      <p className="font-sans text-[0.8rem] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <p className="font-mono text-[0.7rem] tracking-[0.08em]" style={{ color: 'var(--faint)' }}>
        {sublabel}
      </p>
    </div>
  )
}

export function TrustMetrics() {
  return (
    <section
      className=""
      style={{
        backgroundColor: 'var(--obsidian)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
      }}
      aria-label="Trust metrics"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <CountUpMetric
            target={48}
            suffix="M+"
            unit="R"
            label="Audit Value Certified 2025"
            sublabel="across all client engagements"
          />
          <CountUpMetric
            target={420}
            suffix="+"
            label="Clients Served"
            sublabel="across 8 industries"
          />
          <CountUpMetric
            target={22}
            suffix=""
            label="Years Combined CA(SA) Experience"
            sublabel="SAICA-registered practitioners"
            isLast
          />
        </div>
      </div>
    </section>
  )
}
