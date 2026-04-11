import Image from 'next/image'

type BrandLogoProps = {
  /** Bounding box size (square); image scales with object-contain */
  size?: number
  className?: string
  priority?: boolean
}

/**
 * ABC Inc. brand mark — `public/images/brand/abc-inc-chartered-accountant-logo.png`
 */
export function BrandLogo({ size = 44, className = '', priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/images/brand/abc-inc-chartered-accountant-logo.png"
      alt=""
      width={size}
      height={size}
      className={`object-contain object-left ${className}`}
      priority={priority}
      aria-hidden
    />
  )
}
