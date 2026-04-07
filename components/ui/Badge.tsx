import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'profit' | 'loss' | 'pending' | 'neutral' | 'outline' | 'accent'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  'border-2 border-[var(--white)] text-[var(--white)] bg-[var(--carbon)]',
  outline:  'border-2 border-[var(--white)] text-[var(--white)]',
  accent:   'border-2 border-[#0A0A08] text-[#0A0A08] bg-[var(--accent)]',
  profit:   'border-2 border-profit text-profit bg-[var(--carbon)]',
  loss:     'border-2 border-loss text-loss bg-[var(--carbon)]',
  pending:  'border-2 border-pending text-pending bg-[var(--carbon)]',
  neutral:  'border-2 border-neutral text-neutral bg-[var(--carbon)]',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.14em] uppercase font-bold',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
