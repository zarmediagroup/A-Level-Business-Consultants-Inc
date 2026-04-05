export function MarqueeTrustBar() {
  const items = [
    'SAICA Registered',
    'IRBA Approved',
    'CIPC Accredited',
    'SARS Compliant',
    'Companies Act 2008',
    'IFRS Standards',
    'King IV Governance',
    'Independent Audit Services',
    'Management Accounts',
    'Annual Financial Statements',
    'Tax Compliance',
    'Company Secretarial',
    'Provisional Tax',
    'VAT Registration',
    'POPIA Compliant',
  ]

  const text = items.map(item => `· ${item}  `).join('')
  const doubled = text + text

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--obsidian)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        height: '48px',
      }}
      aria-label="Trust credentials"
    >
      <div className="flex items-center h-full">
        <div
          className="marquee-track whitespace-nowrap"
          aria-hidden="true"
        >
          <span
            className="font-mono text-[0.7rem] tracking-[0.12em]"
            style={{ color: 'var(--muted)' }}
          >
            {doubled}
          </span>
        </div>
      </div>
    </div>
  )
}
