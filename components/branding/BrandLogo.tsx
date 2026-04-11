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

/** Brand mark — path from `defaultTenant.logo_url` (SEO-friendly filename in `/public`). */
export function BrandLogo({
  size = 44,
  width: widthProp,
  height: heightProp,
  className = '',
  priority = false,
}: BrandLogoProps) {
  const src =
    defaultTenant.logo_url ?? '/images/brand/abc-inc-chartered-accountants-south-africa-logo.png'
  const width = widthProp ?? size
  const height = heightProp ?? size
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className={`object-contain object-left ${className}`}
      priority={priority}
      aria-hidden
    />
  )
}
