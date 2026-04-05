import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-[0.65rem] text-muted uppercase tracking-[0.14em]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-12 px-4 bg-ink border border-graphite rounded-[1px] text-white font-sans text-sm',
            'placeholder:text-faint focus:outline-none focus:border-white transition-colors duration-200',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'
