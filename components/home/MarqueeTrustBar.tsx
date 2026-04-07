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

  const text = items.map(item => `→ ${item}  `).join('')
  const doubled = text + text

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--accent)',
        borderTop: '2px solid #0A0A08',
        borderBottom: '2px solid #0A0A08',
        height: '52px',
      }}
      aria-label="Trust credentials"
    >
      <div className="flex items-center h-full">
        <div
          className="marquee-track whitespace-nowrap"
          aria-hidden="true"
        >
          <span
            className="font-mono text-[0.7rem] tracking-[0.14em] font-bold uppercase"
            style={{ color: '#0A0A08' }}
          >
            {doubled}
          </span>
        </div>
      </div>
    </div>
  )
}
