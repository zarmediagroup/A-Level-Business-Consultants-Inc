import { DashboardWidget } from '@/components/portal/DashboardWidget'
import { defaultTenant } from '@/types/tenant'

const messages = [
  {
    monogram: 'AQ',
    sender: 'Adrian Quina CA(SA)',
    subject: 'Q4 Management Accounts Ready',
    preview: 'Your Q4 management accounts are ready for review. Please log into the portal to download.',
    time: 'Today, 10:24',
    unread: true,
  },
  {
    monogram: 'AQ',
    sender: 'Adrian Quina CA(SA)',
    subject: 'EMP501 Reconciliation Reminder',
    preview: 'Reminder: EMP501 reconciliation is due 31 May 2025. Please ensure all payroll data is current.',
    time: 'Yesterday',
    unread: true,
  },
  {
    monogram: 'SF',
    sender: 'SARS eFiling',
    subject: 'VAT201 Assessment',
    preview: 'Your VAT201 return has been assessed successfully. No additional amount payable.',
    time: '2 Feb 2025',
    unread: false,
  },
  {
    monogram: 'AQ',
    sender: 'Adrian Quina CA(SA)',
    subject: 'Annual Financial Statements Signed',
    preview: 'I am pleased to confirm your 2024 Annual Financial Statements have been finalised and signed off.',
    time: '22 Jan 2025',
    unread: false,
  },
  {
    monogram: 'AQ',
    sender: 'Adrian Quina CA(SA)',
    subject: 'Onboarding Complete',
    preview: `Welcome to the ${defaultTenant.firm_name} client portal. You can now access all your documents here.`,
    time: '10 Jan 2025',
    unread: false,
  },
]

export default function MessagesPage() {
  return (
    <DashboardWidget label="Messages">
      <div className="flex flex-col gap-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="flex items-start gap-4 py-4 cursor-pointer group"
            style={{
              borderBottom: i < messages.length - 1 ? '1px solid var(--rule)' : 'none',
              borderLeft: msg.unread ? '2px solid var(--white)' : '2px solid transparent',
              paddingLeft: msg.unread ? 'calc(1rem - 2px)' : '0',
              backgroundColor: msg.unread ? 'var(--ash)' : 'transparent',
              marginLeft: '-1.5rem',
              paddingRight: 0,
              borderRadius: '1px',
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[0.7rem] border shrink-0 ml-6"
              style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}>
              {msg.monogram}
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-sans text-sm font-semibold text-white truncate">{msg.sender}</p>
                <p className="font-mono text-[0.62rem] shrink-0" style={{ color: 'var(--faint)' }}>{msg.time}</p>
              </div>
              <p className="font-sans text-sm text-white mb-1">{msg.subject}</p>
              <p className="font-sans text-[0.8rem] truncate" style={{ color: 'var(--muted)' }}>{msg.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  )
}
