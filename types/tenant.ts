export interface Tenant {
  id: string
  domain: string
  firm_name: string
  logo_url: string | null
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
}

export const defaultTenant: Tenant = {
  id: 'a-level',
  domain: 'abcinc.co.za',
  firm_name: 'ABC INC',
  logo_url: '/images/brand/abc-inc-chartered-accountants-south-africa-logo.png',
  logo_alt: 'ABC INC — chartered accountants and auditors, Cape Town, South Africa (official logo)',
  logo_width: 502,
  logo_height: 497,
  principal_image_url: '/images/team/adrian-quina-ca-sa-founder.png',
  accountant_name: 'Adrian Quina CA(SA)',
  email: 'Adrian@abcinc.co.za',
  phone: '063 304 1942',
  address: 'Stanley &, Dock Rd, Cape Town City Centre',
  city: 'Cape Town, 8001',
  saica_member: true,
  irba_registered: true,
  cipc_accredited: true,
  calendly_url: 'https://calendly.com/adrian-abcinc/30min?month=2026-04',
}
