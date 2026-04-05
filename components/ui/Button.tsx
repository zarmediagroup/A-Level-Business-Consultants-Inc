import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 rounded-[1px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2'

    const variants = {
      primary: 'bg-white text-ink hover:bg-off-white',
      outline: 'border border-white text-white hover:bg-white hover:text-ink',
      ghost:   'text-white hover:text-off-white',
    }

    const sizes = {
      sm: 'h-8 px-4 text-[13px]',
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
