import { defaultTenant } from '@/types/tenant'

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '')
}

/** Accepts env values like `localhost:3000` or `example.com` and returns a usable origin. */
function ensureAbsoluteOrigin(raw: string): string {
  const trimmed = raw.trim()
  if (/^https?:\/\//i.test(trimmed)) return stripTrailingSlash(trimmed)
  if (/^(localhost|127\.0\.0\.1)/i.test(trimmed)) return stripTrailingSlash(`http://${trimmed}`)
  return stripTrailingSlash(`https://${trimmed}`)
}

/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_APP_URL` on Vercel to the hostname users end up on after redirects
 * (here: `https://www.alevelbusinessconsultants.co.za`), otherwise metadata and the
 * sitemap can disagree with the live URL and Search Console will flag those pages.
 */
export function getSiteUrl(): string {
  const raw =
    typeof process.env.NEXT_PUBLIC_APP_URL === 'string'
      ? process.env.NEXT_PUBLIC_APP_URL.trim()
      : ''
  if (raw) {
    return ensureAbsoluteOrigin(raw)
  }
  const host = defaultTenant.domain.replace(/^www\./i, '')
  return `https://www.${host}`
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
