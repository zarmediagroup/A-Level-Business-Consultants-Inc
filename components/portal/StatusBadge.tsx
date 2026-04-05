import type { DocumentStatus } from '@/types/database'
import { STATUS_COLORS } from '@/types/database'

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className="font-mono text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5 border rounded-[1px]"
      style={{ borderColor: STATUS_COLORS[status], color: STATUS_COLORS[status] }}
    >
      {status}
    </span>
  )
}
