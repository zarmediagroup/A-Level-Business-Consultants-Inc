'use client'

const pillars = [
  {
    title: 'SAICA professional standards',
    sublabel: 'Work aligned with the profession\'s ethical and technical requirements.',
  },
  {
    title: 'Confidentiality & POPIA',
    sublabel: 'Client information handled in line with data-protection and confidentiality obligations.',
  },
  {
    title: 'South African businesses',
    sublabel: 'Accounting, tax and company secretarial support for SMEs and individuals.',
  },
]

function TrustPillar({
  title,
  sublabel,
  isLast,
}: {
  title: string
  sublabel: string
  isLast?: boolean
}) {
  return (
    <div
      className="flex flex-col items-center text-center py-12 px-8"
      style={!isLast ? { borderRight: '2px solid var(--white)' } : {}}
    >
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] mb-3 font-bold" style={{ color: 'var(--white)' }}>
        {title}
      </p>
      <p className="font-sans text-sm leading-[1.65] max-w-xs font-medium" style={{ color: 'var(--muted)' }}>
        {sublabel}
      </p>
    </div>
  )
}

export function TrustMetrics() {
  return (
    <section
      style={{
        backgroundColor: 'var(--obsidian)',
        borderTop: '2px solid var(--white)',
        borderBottom: '2px solid var(--white)',
      }}
      aria-label="Professional standards"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <TrustPillar key={p.title} {...p} isLast={i === pillars.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
