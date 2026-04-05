import { DashboardWidget } from '@/components/portal/DashboardWidget'

type ReportStatus = 'DRAFT' | 'FINAL' | 'SIGNED OFF'

const statusColors: Record<ReportStatus, string> = {
  'DRAFT':      'var(--pending)',
  'FINAL':      'var(--muted)',
  'SIGNED OFF': 'var(--profit)',
}

const reports = [
  { period: 'FY 2024',   type: 'Annual Financial Statements', status: 'SIGNED OFF' as ReportStatus, date: '2025-01-22' },
  { period: 'FY 2023',   type: 'Annual Financial Statements', status: 'SIGNED OFF' as ReportStatus, date: '2024-02-10' },
  { period: 'Dec 2024',  type: 'Management Accounts',         status: 'FINAL' as ReportStatus,      date: '2025-01-10' },
  { period: 'Nov 2024',  type: 'Management Accounts',         status: 'FINAL' as ReportStatus,      date: '2024-12-08' },
  { period: 'Oct 2024',  type: 'Management Accounts',         status: 'FINAL' as ReportStatus,      date: '2024-11-06' },
  { period: 'FY 2024',   type: 'Tax Computation',             status: 'SIGNED OFF' as ReportStatus, date: '2025-01-15' },
  { period: 'Feb 2025',  type: 'VAT Audit Pack',              status: 'DRAFT' as ReportStatus,      date: '2025-02-04' },
  { period: 'Q4 2024',   type: 'Payroll Summary',             status: 'FINAL' as ReportStatus,      date: '2024-12-15' },
  { period: 'FY 2024',   type: 'SARS Assessment Letter',      status: 'SIGNED OFF' as ReportStatus, date: '2024-12-18' },
]

export default function ReportsPage() {
  return (
    <DashboardWidget label="Financial Reports">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <div
            key={i}
            className="rounded-[1px] p-6 flex flex-col justify-between"
            style={{ backgroundColor: 'var(--obsidian)', border: '1px solid var(--rule)' }}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: 'var(--muted)' }}>
                  {r.period}
                </p>
                <span
                  className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 border rounded-[1px]"
                  style={{ borderColor: statusColors[r.status], color: statusColors[r.status] }}
                >
                  {r.status}
                </span>
              </div>
              <p className="font-playfair text-white text-lg leading-tight mb-3">{r.type}</p>
              <p className="font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>
                {r.date}
              </p>
            </div>
            <div className="flex gap-2 mt-6 pt-4" style={{ borderTop: '1px solid var(--rule)' }}>
              <button
                className="flex-1 h-9 font-mono text-[0.65rem] tracking-[0.1em] uppercase border rounded-[1px] transition-colors hover:border-white hover:text-white"
                style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
              >
                View
              </button>
              <button
                className="flex-1 h-9 font-mono text-[0.65rem] tracking-[0.1em] uppercase border rounded-[1px] transition-colors hover:border-white hover:text-white"
                style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
              >
                ↓ PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}
