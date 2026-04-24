export interface Tenant {
  id: string
  domain: string
  firm_name: string
  logo_url: string | null
  /** Logo for dark backgrounds (default site theme). Used in UI + canonical OG / JSON-LD when set. */
  logo_url_dark?: string | null
  /** SEO / rich results: descriptive alt for the logo image */
  logo_alt?: string
  /** Intrinsic pixel size of logo asset (Open Graph / JSON-LD ImageObject) */
  logo_width?: number
  logo_height?: number
  /** Public path to principal / founder portrait (e.g. About page). */
  principal_image_url?: string | null
  primary_color?: string
  accountant_name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  saica_member?: boolean
  irba_registered?: boolean
  cipc_accredited?: boolean
  calendly_url?: string
  /** Optional profile URLs for Organization `sameAs` (e.g. LinkedIn company or principal `/in/…` profile). */
  same_as?: string[]
  /** Optional “site by” credit (footer backlink). */
  web_credit?: { name: string; url: string }
}

export const defaultTenant: Tenant = {
  id: 'a-level',
  domain: 'alevelbusinessconsultants.co.za',
  firm_name: 'ABC INC',
  logo_url: '/images/brand/abc-inc-chartered-accountants-south-africa-logo.png',
  logo_url_dark: '/images/brand/abc-inc-logo-dark.png',
  logo_alt:
    'ABC INC logo — overlapping metallic silver circles with ABC lettering and INC caption; SAICA-registered chartered accountants and auditors, Cape Town, South Africa (official brand mark)',
  logo_width: 502,
  logo_height: 497,
  principal_image_url: '/images/team/adrian-quina-ca-sa-founder.png',
  accountant_name: 'Adrian Quina CA(SA)',
  email: 'Adrian@abcinc.co.za',
  phone: '063 304 1942',
  address: 'Stanley &, Dock Rd, Cape Town City Centre',
  city: 'Cape Town, 8001',
  saica_member: true,
  irba_registered: false,
  cipc_accredited: true,
  calendly_url: 'https://calendly.com/adrian-abcinc/30min?month=2026-04',
  same_as: ['https://www.linkedin.com/in/adrian-quina-25020b319/'],
  web_credit: { name: 'ZAR Media Group', url: 'https://zarmediagroup.com' },
}
