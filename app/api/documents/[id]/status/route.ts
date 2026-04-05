import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdmin } from '@/lib/supabase-server'
import { sendDocumentStatusEmail } from '@/lib/email'
import type { DocumentStatus } from '@/types/database'

/** PATCH /api/documents/[id]/status — admin sets document status */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase      = await createSupabaseServerClient()
  const supabaseAdmin = createSupabaseAdmin()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: actorProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (actorProfile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { status }: { status: DocumentStatus } = await request.json()
  const validStatuses = ['Received', 'Under Review', 'Processed', 'Requires Action']
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('name, client_id')
    .eq('id', id)
    .single()

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabaseAdmin
    .from('documents')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  // Notify client in-portal
  await supabaseAdmin.from('notifications').insert({
    user_id: doc.client_id,
    type:    'status_change',
    title:   `Document status updated: ${status}`,
    body:    doc.name,
    link:    '/portal/documents',
    metadata: { document_id: id, status },
  })

  // Audit log
  await supabaseAdmin.from('audit_log').insert({
    actor_id:      user.id,
    actor_email:   user.email,
    action:        'document.status_change',
    resource_type: 'document',
    resource_id:   id,
    metadata:      { status, file_name: doc.name },
  })

  // Email client
  try {
    const { data: clientProfile } = await supabaseAdmin
      .from('profiles').select('email, full_name').eq('id', doc.client_id).single()
    if (clientProfile) {
      await sendDocumentStatusEmail({
        clientEmail: clientProfile.email,
        clientName:  clientProfile.full_name,
        fileName:    doc.name,
        status,
        documentId:  id,
      })
    }
  } catch (_) {}

  return NextResponse.json({ success: true })
}
