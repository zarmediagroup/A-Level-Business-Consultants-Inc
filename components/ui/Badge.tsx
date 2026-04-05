import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'profit' | 'loss' | 'pending' | 'neutral' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  'border border-[var(--rule-mid)] text-muted',
  outline:  'border border-white text-white',
  profit:   'border border-profit text-profit',
  loss:     'border border-loss text-loss',
  pending:  'border border-pending text-pending',
  neutral:  'border border-neutral text-neutral',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-[1px] font-mono text-[0.65rem] tracking-[0.14em] uppercase',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
