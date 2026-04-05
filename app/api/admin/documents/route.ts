import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'

/** GET /api/admin/documents — all documents across all clients with rich filters */
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: p } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (p?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const sp       = request.nextUrl.searchParams
  const clientId = sp.get('client_id')
  const category = sp.get('category')
  const year     = sp.get('year')
  const status   = sp.get('status')
  const search   = sp.get('search') ?? ''

  const supabaseAdmin = createSupabaseAdmin()
  let query = supabaseAdmin
    .from('documents')
    .select(`
      *,
      client:profiles!documents_client_id_fkey(id, full_name, email),
      uploader:profiles!documents_uploaded_by_fkey(id, full_name)
    `)
    .order('created_at', { ascending: false })

  if (clientId) query = query.eq('client_id', clientId)
  if (category)  query = query.eq('category', category)
  if (year)      query = query.eq('year', Number(year))
  if (status)    query = query.eq('status', status)
  if (search)    query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
