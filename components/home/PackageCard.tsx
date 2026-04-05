'use client'

import { defaultTenant } from '@/types/tenant'

interface Package {
  tier: string
  vatStatus: string
  price: string
  period: string
  highlight: boolean
  features: string[]
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const tenant = defaultTenant
  return (
    <div
      className="rounded-[1px] flex flex-col h-full relative"
      style={{
        backgroundColor: pkg.highlight ? 'var(--ash)' : 'var(--carbon)',
        border: pkg.highlight ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--rule)',
      }}
    >
      {pkg.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.14em] uppercase px-3 py-1 bg-white text-ink rounded-[1px]">
          Most Popular
        </div>
      )}
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
            {pkg.tier}
          </p>
          <span
            className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 border rounded-[1px]"
            style={{ borderColor: 'var(--rule-mid)', color: 'var(--faint)' }}
          >
            {pkg.vatStatus}
          </span>
        </div>
        <div className="mt-4 mb-8 flex items-baseline gap-1">
          <span className="font-bebas text-white" style={{ fontSize: '3rem' }}>{pkg.price}</span>
          <span className="font-mono text-[0.7rem]" style={{ color: 'var(--muted)' }}>{pkg.period}</span>
        </div>
        <ul className="flex flex-col gap-0">
          {pkg.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-2.5"
              style={{ borderBottom: i < pkg.features.length - 1 ? '1px solid var(--rule)' : 'none' }}
            >
              <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: 'var(--profit)' }}>✓</span>
              <span className="font-sans text-[0.8rem]" style={{ color: 'var(--off-white)' }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 pt-0">
        <a
          href={tenant.calendly_url ?? '/contact'}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full h-12 font-sans text-sm rounded-[1px] transition-all duration-200 flex items-center justify-center hover:bg-white hover:text-ink"
          style={{
            backgroundColor: pkg.highlight ? 'var(--white)' : 'transparent',
            color: pkg.highlight ? 'var(--ink)' : 'var(--white)',
            border: pkg.highlight ? 'none' : '1px solid var(--rule-mid)',
          }}
        >
          Get Started →
        </a>
      </div>
    </div>
  )
}
