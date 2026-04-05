import { Tenant, defaultTenant } from '@/types/tenant'
import { supabase } from './supabase'

export async function getTenantByDomain(domain: string): Promise<Tenant> {
  if (!supabase) return defaultTenant

  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('domain', domain)
    .single()

  if (error || !data) return defaultTenant
  return data as Tenant
}
