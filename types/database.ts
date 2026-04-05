export type UserRole = 'admin' | 'client'

export type DocumentCategory =
  | 'Bank Statement'
  | 'Invoice'
  | 'Tax Certificate'
  | 'ID Document'
  | 'AFS'
  | 'Management Accounts'
  | 'SARS Returns'
  | 'Payroll'
  | 'Other'

export type DocumentStatus = 'Received' | 'Under Review' | 'Processed' | 'Requires Action'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone?: string
  company?: string
  service_category?: string
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  client_id: string
  uploaded_by: string
  name: string
  file_path: string
  file_type: string
  file_size: number
  category: DocumentCategory
  year: number
  status: DocumentStatus
  is_resubmission: boolean
  original_doc_id?: string
  created_at: string
  updated_at: string
  // Joined
  client?: Profile
  uploader?: Profile
  comments?: DocumentComment[]
}

export interface DocumentComment {
  id: string
  document_id: string
  author_id: string
  content: string
  created_at: string
  author?: Profile
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  body: string
  read: boolean
  link?: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface AuditLog {
  id: string
  actor_id?: string
  actor_email?: string
  action: string
  resource_type: string
  resource_id?: string
  metadata?: Record<string, unknown>
  created_at: string
  actor?: Profile
}

export interface ClientNote {
  id: string
  client_id: string
  created_by: string
  content: string
  created_at: string
  author?: Profile
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  'Bank Statement',
  'Invoice',
  'Tax Certificate',
  'ID Document',
  'AFS',
  'Management Accounts',
  'SARS Returns',
  'Payroll',
  'Other',
]

export const DOCUMENT_STATUSES: DocumentStatus[] = [
  'Received',
  'Under Review',
  'Processed',
  'Requires Action',
]

export const STATUS_COLORS: Record<DocumentStatus, string> = {
  'Received':        'var(--muted)',
  'Under Review':    'var(--pending)',
  'Processed':       'var(--profit)',
  'Requires Action': 'var(--loss)',
}
