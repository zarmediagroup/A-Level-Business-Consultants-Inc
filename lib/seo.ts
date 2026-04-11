import { defaultTenant } from '@/types/tenant'

/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://abcinc.co.za).
 */
export function getSiteUrl(): string {
  const raw =
    typeof process.env.NEXT_PUBLIC_APP_URL === 'string'
      ? process.env.NEXT_PUBLIC_APP_URL.trim()
      : ''
  if (raw) {
    return raw.replace(/\/$/, '')
  }
  return `https://${defaultTenant.domain}`
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
