export interface Tenant {
  id: string
  domain: string
  firm_name: string
  logo_url: string | null
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
  domain: 'alevelconsultants.co.za',
  firm_name: 'A Level Business Consultants Inc',
  logo_url: null,
  accountant_name: 'Adrian Quina CA(SA)',
  email: 'Adrian@abcinc.co.za',
  phone: '063 304 1942',
  address: 'Stanley & Dock Rd, Cape Town City Centre',
  city: 'Cape Town, 8001',
  saica_member: true,
  irba_registered: true,
  cipc_accredited: true,
  calendly_url: 'https://calendly.com/adrian-abcinc/30min',
}
