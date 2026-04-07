import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="font-mono text-[0.65rem] text-[var(--white)] uppercase tracking-[0.18em] font-bold"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-12 px-4 neo-input font-sans text-sm font-medium',
            'placeholder:text-[var(--faint)]',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'
