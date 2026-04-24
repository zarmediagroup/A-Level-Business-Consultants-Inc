'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Sends GA4 page views on client-side navigations (initial load is handled by gtag config in root layout). */
export function GtagPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (!gaId || typeof window.gtag !== 'function') return
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    const path = `${window.location.pathname}${window.location.search}`
    window.gtag('config', gaId, { page_path: path })
  }, [pathname, gaId])

  return null
}
