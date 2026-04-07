import type { DocumentStatus } from '@/types/database'
import { STATUS_COLORS } from '@/types/database'

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 font-bold"
      style={{
        border: `2px solid ${STATUS_COLORS[status]}`,
        color: STATUS_COLORS[status],
        backgroundColor: 'var(--carbon)',
      }}
    >
      {status}
    </span>
  )
}
