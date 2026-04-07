import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-sans font-bold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-3 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2'

    const variants = {
      primary: 'neo-btn-primary',
      outline: 'neo-btn-outline',
      ghost:   'text-[var(--white)] underline underline-offset-4 decoration-2 hover:text-[var(--accent)] transition-colors duration-100',
    }

    const sizes = {
      sm: 'h-9 px-4 text-[13px]',
      md: 'h-12 px-6 text-[14px]',
      lg: 'h-14 px-8 text-[15px] min-w-[240px]',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
