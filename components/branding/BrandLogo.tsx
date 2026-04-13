import Image from 'next/image'
import { defaultTenant } from '@/types/tenant'

type BrandLogoProps = {
  /** Square bounding box (used when `width` / `height` not set) */
  size?: number
  /** Explicit width in px (e.g. wide navbar mark) */
  width?: number
  /** Explicit height in px */
  height?: number
  className?: string
  priority?: boolean
}

const fallback = '/images/brand/abc-inc-chartered-accountants-south-africa-logo.png'

/**
 * Brand mark — `logo_url_dark` without `html.light`, `logo_url` when `html.light` (matches globals.css).
 */
export function BrandLogo({
  size = 64,
  width: widthProp,
  height: heightProp,
  className = '',
  priority = false,
}: BrandLogoProps) {
  const lightSrc = defaultTenant.logo_url ?? fallback
  const darkSrc = defaultTenant.logo_url_dark ?? defaultTenant.logo_url ?? fallback
  const width = widthProp ?? size
  const height = heightProp ?? size
  const base = `object-contain object-left ${className}`
  return (
    <>
      <span className="brand-logo-dark-wrap">
        <Image
          src={darkSrc}
          alt=""
          width={width}
          height={height}
          className={base}
          priority={priority}
          aria-hidden
        />
      </span>
      <span className="brand-logo-light-wrap">
        <Image
          src={lightSrc}
          alt=""
          width={width}
          height={height}
          className={base}
          loading={priority ? undefined : 'lazy'}
          aria-hidden
        />
      </span>
    </>
  )
}
