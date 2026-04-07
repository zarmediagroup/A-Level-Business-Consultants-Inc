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
      className={`${className ?? ''}`}
      style={{
        backgroundColor: 'var(--carbon)',
        border: '2px solid var(--white)',
        boxShadow: 'var(--neo-shadow)',
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: '2px solid var(--white)',
          backgroundColor: 'var(--graphite)',
        }}
      >
        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase font-bold" style={{ color: 'var(--accent)' }}>
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
