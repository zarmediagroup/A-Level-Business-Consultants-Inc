import { DashboardWidget } from '@/components/portal/DashboardWidget'

type DeadlineStatus = 'OVERDUE' | 'DUE SOON' | 'COMPLETE' | 'UPCOMING'

const statusColors: Record<DeadlineStatus, string> = {
  'OVERDUE':  'var(--loss)',
  'DUE SOON': 'var(--pending)',
  'COMPLETE': 'var(--profit)',
  'UPCOMING': 'var(--muted)',
}

const statusIcons: Record<DeadlineStatus, string> = {
  'OVERDUE':  '✗',
  'DUE SOON': '⚠',
  'COMPLETE': '✓',
  'UPCOMING': '○',
}

const deadlines = [
  { date: '31 Jan 2025', desc: 'VAT201 Return',                        type: 'VAT',          status: 'COMPLETE' as DeadlineStatus },
  { date: '28 Feb 2025', desc: 'Provisional Tax 2nd Payment (IRP6)',    type: 'TAX',          status: 'DUE SOON' as DeadlineStatus },
  { date: '28 Feb 2025', desc: 'VAT201 Return',                         type: 'VAT',          status: 'DUE SOON' as DeadlineStatus },
  { date: '31 Mar 2025', desc: 'Annual Financial Statements',           type: 'AFS',          status: 'UPCOMING' as DeadlineStatus },
  { date: '30 Apr 2025', desc: 'ITR14 Company Tax Return',              type: 'TAX',          status: 'UPCOMING' as DeadlineStatus },
  { date: '31 May 2025', desc: 'EMP501 Employer Reconciliation',        type: 'PAYE',         status: 'UPCOMING' as DeadlineStatus },
  { date: '31 May 2025', desc: 'CIPC Annual Return',                    type: 'SECRETARIAL',  status: 'UPCOMING' as DeadlineStatus },
  { date: '30 Jun 2025', desc: 'VAT201 Return',                         type: 'VAT',          status: 'UPCOMING' as DeadlineStatus },
  { date: '31 Aug 2025', desc: 'Provisional Tax 1st Payment (IRP6)',    type: 'TAX',          status: 'UPCOMING' as DeadlineStatus },
  { date: '31 Oct 2025', desc: 'VAT201 Return',                         type: 'VAT',          status: 'UPCOMING' as DeadlineStatus },
]

export default function DeadlinesPage() {
  return (
    <DashboardWidget label="Compliance Calendar — 2025">
      <div className="flex flex-col gap-0">
        {deadlines.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4"
            style={{ borderBottom: i < deadlines.length - 1 ? '1px solid var(--rule)' : 'none' }}
          >
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-base w-5 text-center shrink-0"
                style={{ color: statusColors[d.status] }}
              >
                {statusIcons[d.status]}
              </span>
              <div>
                <p className="font-sans text-sm text-white">{d.desc}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>{d.date}</p>
                  <span
                    className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-1.5 py-0.5 border rounded-[1px]"
                    style={{ borderColor: 'var(--rule-mid)', color: 'var(--faint)' }}
                  >
                    {d.type}
                  </span>
                </div>
              </div>
            </div>
            <span
              className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-1 border rounded-[1px] shrink-0 ml-4"
              style={{ borderColor: statusColors[d.status], color: statusColors[d.status] }}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}
