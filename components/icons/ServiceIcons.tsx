import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

const iconClass = 'shrink-0 block'

type IconProps = { className?: string; style?: CSSProperties }

/** Launch / Accelerate / Growth / Scale — visual tier marks */
export function TierIcon({ tier, className = '', style }: { tier: string } & IconProps) {
  const c = { className: `${iconClass} ${className}`, style, fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.75 }
  switch (tier) {
    case 'Launch':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" {...c} aria-hidden>
          <path d="M12 3L4 12h4v8h8v-8h4L12 3z" strokeLinejoin="round" />
        </svg>
      )
    case 'Accelerate':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" {...c} aria-hidden>
          <path d="M4 16l6-6 4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 6h6v6" strokeLinecap="round" />
        </svg>
      )
    case 'Growth':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" {...c} aria-hidden>
          <path d="M12 21V9" />
          <path d="M8 14l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 9c2-4 4-6 6-6s4 2 6 6" />
        </svg>
      )
    case 'Scale':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" {...c} aria-hidden>
          <rect x="3" y="14" width="6" height="6" />
          <rect x="9" y="10" width="6" height="10" />
          <rect x="15" y="4" width="6" height="16" />
        </svg>
      )
    default:
      return null
  }
}

function IconTax({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M9 2L3 5v6c0 4.5 3 8.5 9 10 6-1.5 9-5.5 9-10V5l-6-3" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconLedger({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="4" y="3" width="16" height="18" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  )
}

function IconChart({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19h16" />
      <path d="M6 16l4-4 4 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconBuilding({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 20h16" />
      <path d="M6 20V4h12v16" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2" />
    </svg>
  )
}

function IconBank({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 10h18l-9-6-9 6z" />
      <path d="M5 10v8h10v-8" />
    </svg>
  )
}

function IconDefault({ style, className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`${iconClass} ${className ?? ''}`} style={style} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

/** Picks an icon by feature line text (packages, lists). */
export function ServiceFeatureIcon({
  feature,
  highlight,
}: {
  feature: string
  highlight?: boolean
}) {
  const color = highlight ? 'var(--accent-fg)' : 'var(--accent)'
  const f = feature.toLowerCase()

  if (f.includes('xero')) {
    return (
      <span className="relative h-[18px] w-[18px] shrink-0 inline-flex items-center justify-center" aria-hidden>
        <Image
          src="/images/partners/xero-cloud-accounting-software-logo.png"
          alt=""
          width={18}
          height={18}
          className="object-contain"
        />
      </span>
    )
  }

  let node: ReactNode
  if (
    f.includes('itr') ||
    f.includes('irp6') ||
    f.includes('tax') ||
    f.includes('vat') ||
    f.includes('provisional')
  ) {
    node = <IconTax style={{ color }} />
  } else if (f.includes('bookkeeping') || f.includes('reconcil')) {
    node = <IconLedger style={{ color }} />
  } else if (f.includes('accounting') && !f.includes('tax')) {
    node = <IconLedger style={{ color }} />
  } else if (f.includes('management') || f.includes('financial statements') || f.includes('reporting')) {
    node = <IconChart style={{ color }} />
  } else if (f.includes('cipc') || f.includes('beneficial') || f.includes('director') || f.includes('company registration')) {
    node = <IconBuilding style={{ color }} />
  } else if (f.includes('secretarial') || (f.includes('registration') && !f.includes('tax'))) {
    node = <IconBuilding style={{ color }} />
  } else if (f.includes('payroll') || f.includes('paye') || f.includes('uif') || f.includes('coida')) {
    node = <IconBank style={{ color }} />
  } else if (f.includes('bank')) {
    node = <IconBank style={{ color }} />
  } else {
    node = <IconDefault style={{ color: highlight ? 'var(--accent-fg)' : 'var(--profit)' }} />
  }

  return <span className="mt-0.5 flex items-center justify-center">{node}</span>
}

/** Section headers for Services page */
export function TaxComplianceIcon({ className, style }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ''}`} style={style} aria-hidden>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75">
        <path d="M9 2L3 5v6c0 4.5 3 8.5 9 10 6-1.5 9-5.5 9-10V5l-6-3" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function BookkeepingSectionIcon({ className, style }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center ${className ?? ''}`} style={style} aria-hidden>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.75">
        <rect x="4" y="3" width="16" height="18" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    </span>
  )
}

/** Package page section headers */
export function IndividualPackagesIcon({ className, style }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" className={`shrink-0 ${className ?? ''}`} style={style} fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="8" r="5" />
      <path d="M19 20v-1a6 6 0 0 0-6-6H11a6 6 0 0 0-6 6v1" />
    </svg>
  )
}

export function CompanyPackagesIcon({ className, style }: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" className={`shrink-0 ${className ?? ''}`} style={style} fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M9 14v6M16 14v6M6 20h12" />
    </svg>
  )
}
