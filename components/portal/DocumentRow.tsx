interface DocumentRowProps {
  name: string
  date: string
  category?: string
}

export function DocumentRow({ name, date, category }: DocumentRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3 group"
      style={{ borderBottom: '1px solid var(--rule)' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-sm shrink-0" style={{ color: 'var(--muted)' }}>📄</span>
        <div className="min-w-0">
          <p className="font-sans text-sm text-white truncate">{name}</p>
          {category && (
            <p className="font-mono text-[0.6rem] tracking-[0.08em]" style={{ color: 'var(--faint)' }}>
              {category}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0 ml-4">
        <span className="hidden sm:block font-mono text-[0.65rem]" style={{ color: 'var(--faint)' }}>
          {date}
        </span>
        <button
          className="font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 border rounded-[1px] transition-all duration-200 hover:border-white hover:text-white"
          style={{ borderColor: 'var(--rule-mid)', color: 'var(--muted)' }}
          aria-label={`Download ${name}`}
        >
          ↓
        </button>
      </div>
    </div>
  )
}
