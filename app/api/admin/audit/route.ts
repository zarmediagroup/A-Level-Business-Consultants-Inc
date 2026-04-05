import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (p?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const sp = request.nextUrl.searchParams
  const limit = Math.min(Number(sp.get('limit') ?? 100), 500)
  const offset = Number(sp.get('offset') ?? 0)

  const supabaseAdmin = createSupabaseAdmin()
  const { data, error, count } = await supabaseAdmin
    .from('audit_log')
    .select('*, actor:profiles(id, full_name, role)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, total: count })
}
