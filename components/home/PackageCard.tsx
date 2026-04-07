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
      className="flex flex-col h-full relative"
      style={{
        backgroundColor: pkg.highlight ? 'var(--accent)' : 'var(--carbon)',
        border: '2px solid var(--white)',
        boxShadow: pkg.highlight ? 'var(--neo-shadow-lg)' : 'var(--neo-shadow)',
      }}
    >
      {pkg.highlight && (
        <div
          className="absolute -top-4 left-6 font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold px-3 py-1.5"
          style={{
            backgroundColor: '#0A0A08',
            color: 'var(--accent)',
            border: '2px solid #0A0A08',
          }}
        >
          Most Popular
        </div>
      )}

      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-3">
          <p
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase font-bold"
            style={{ color: pkg.highlight ? '#0A0A08' : 'var(--muted)' }}
          >
            {pkg.tier}
          </p>
          <span
            className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-1 font-bold"
            style={{
              border: pkg.highlight ? '2px solid #0A0A08' : '2px solid var(--white)',
              color: pkg.highlight ? '#0A0A08' : 'var(--white)',
            }}
          >
            {pkg.vatStatus}
          </span>
        </div>

        <div className="mt-5 mb-8 flex items-baseline gap-1">
          <span
            className="font-bebas leading-none"
            style={{
              fontSize: '3.5rem',
              color: pkg.highlight ? '#0A0A08' : 'var(--white)',
            }}
          >
            {pkg.price}
          </span>
          <span
            className="font-mono text-[0.7rem] font-bold"
            style={{ color: pkg.highlight ? '#3A3A30' : 'var(--muted)' }}
          >
            {pkg.period}
          </span>
        </div>

        <ul className="flex flex-col gap-0">
          {pkg.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-2.5"
              style={{
                borderBottom: i < pkg.features.length - 1
                  ? pkg.highlight ? '1px solid rgba(10,10,8,0.2)' : '1px solid var(--rule-mid)'
                  : 'none',
              }}
            >
              <span
                className="font-mono text-xs mt-0.5 shrink-0 font-bold"
                style={{ color: pkg.highlight ? '#0A0A08' : 'var(--profit)' }}
              >
                ✓
              </span>
              <span
                className="font-sans text-[0.85rem] font-medium"
                style={{ color: pkg.highlight ? '#0A0A08' : 'var(--off-white)' }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 pt-0">
        <a
          href={tenant.calendly_url ?? '/contact'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-full h-12 font-sans font-bold text-sm tracking-wide ${pkg.highlight ? 'neo-btn-dark' : 'neo-btn-primary'}`}
        >
          Get Started →
        </a>
      </div>
    </div>
  )
}
