export interface Document {
  id: string
  tenant_id: string
  name: string
  category: 'AFS' | 'Management Accounts' | 'SARS Returns' | 'Bank Statements' | 'Payroll' | 'Invoices'
  uploaded_by: string
  period: string
  date: string
  url: string
  size_mb: number
}

export interface FinancialReport {
  id: string
  tenant_id: string
  period: string
  report_type: string
  status: 'DRAFT' | 'FINAL' | 'SIGNED OFF'
  created_at: string
  url?: string
}

export interface Deadline {
  id: string
  tenant_id: string
  date: string
  description: string
  status: 'DUE SOON' | 'COMPLETE' | 'UPCOMING' | 'OVERDUE'
}

export interface Message {
  id: string
  tenant_id: string
  sender: string
  preview: string
  timestamp: string
  read: boolean
}
