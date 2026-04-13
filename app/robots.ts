import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/', '/login', '/reset-password'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: new URL(base).host,
  }
}
