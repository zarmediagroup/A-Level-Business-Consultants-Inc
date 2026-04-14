/**
 * One-time seed script — creates dummy users via the Supabase Admin API
 * (GoTrue-managed, fully functional accounts that can log in).
 *
 * Usage:
 *   node scripts/seed-users.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const envVars = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
    .map(([k, ...v]) => [k, v.join('=')])
)

const SUPABASE_URL      = envVars['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY  = envVars['SUPABASE_SERVICE_ROLE_KEY']
const PASSWORD          = 'TestPortal@2025'

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const users = [
  {
    email:            'thabo.mokoena@gmail.com',
    full_name:        'Thabo Mokoena',
    role:             'client',
    phone:            '+27 82 345 6789',
    company:          'Mokoena Retail Group',
    service_category: 'Accounting',
  },
  {
    email:            'priya.naidoo@naidootrading.co.za',
    full_name:        'Priya Naidoo',
    role:             'client',
    phone:            '+27 71 456 7890',
    company:          'Naidoo Trading CC',
    service_category: 'Tax Compliance',
  },
  {
    email:            'willem.botha@bptechnologies.co.za',
    full_name:        'Willem Botha',
    role:             'client',
    phone:            '+27 83 567 8901',
    company:          'BP Technologies (Pty) Ltd',
    service_category: 'Audit',
  },
  {
    email:            'fatima.cassim@gmail.com',
    full_name:        'Fatima Cassim',
    role:             'client',
    phone:            '+27 76 678 9012',
    company:          'Cassim Family Trust',
    service_category: 'Payroll',
  },
  {
    email:            'sipho.dlamini@dlaminilogistics.co.za',
    full_name:        'Sipho Dlamini',
    role:             'client',
    phone:            '+27 61 789 0123',
    company:          'Dlamini Logistics (Pty) Ltd',
    service_category: 'Bookkeeping',
  },
  {
    email:            'sarah.vandermerwe@alevelbusiness.co.za',
    full_name:        'Sarah van der Merwe',
    role:             'admin',
    phone:            '+27 82 111 2233',
    company:          null,
    service_category: null,
  },
]

for (const u of users) {
  process.stdout.write(`Creating ${u.email} ... `)

  // 1. Create the auth user via GoTrue Admin API
  const { data, error } = await supabase.auth.admin.createUser({
    email:          u.email,
    password:       PASSWORD,
    email_confirm:  true,
    user_metadata:  { full_name: u.full_name, role: u.role },
  })

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log('already exists, skipping.')
    } else {
      console.error(`FAILED — ${error.message}`)
    }
    continue
  }

  // 2. Upsert the profile with full details
  const { error: profileError } = await supabase.from('profiles').upsert({
    id:               data.user.id,
    email:            u.email,
    full_name:        u.full_name,
    role:             u.role,
    phone:            u.phone,
    company:          u.company,
    service_category: u.service_category,
  })

  if (profileError) {
    console.error(`User created but profile upsert failed — ${profileError.message}`)
  } else {
    console.log('done.')
  }
}

console.log(`\nAll done. Password for all users: ${PASSWORD}`)
