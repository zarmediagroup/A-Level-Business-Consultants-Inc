import { absoluteUrl, getSiteUrl } from '@/lib/seo'

export function organizationNodeId(): string {
  return `${getSiteUrl()}/#organization`
}

/** BreadcrumbList — pair with visible on-page breadcrumbs or clear hierarchy (Google rich results). */
export function breadcrumbListJsonLd(items: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path === '/' ? '/' : item.path),
    })),
  }
}

/** FAQPage — must mirror visible FAQ content on the page. */
export function faqPageJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

/** ItemList of core services (supports rich understanding; aligns with on-page H2 sections). */
export function servicesItemListJsonLd() {
  const orgId = organizationNodeId()
  const pageUrl = absoluteUrl('/services')
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Professional accounting services',
    url: pageUrl,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Tax compliance',
          description:
            'SARS returns, VAT, provisional tax, payroll tax, registrations and tax compliance status for South African businesses and individuals.',
          provider: { '@id': orgId },
          areaServed: { '@type': 'Country', name: 'South Africa' },
          serviceType: 'Tax compliance',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Bookkeeping and reporting',
          description:
            'Bookkeeping, annual financial statements, payroll, CIPC annual returns, company secretarial and statutory compliance.',
          provider: { '@id': orgId },
          areaServed: { '@type': 'Country', name: 'South Africa' },
          serviceType: 'Bookkeeping',
        },
      },
    ],
  }
}
