import { ReactNode } from 'react'

interface DashboardWidgetProps {
  label: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function DashboardWidget({ label, action, children, className }: DashboardWidgetProps) {
  return (
    <div
      className={`rounded-[1px] ${className ?? ''}`}
      style={{ backgroundColor: 'var(--carbon)', border: '1px solid var(--rule)' }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>
          {label}
        </p>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
