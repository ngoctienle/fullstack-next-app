import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/libs/utils'

const textVariants = cva('max-w-prose text-primary text-center', {
  variants: {
    size: {
      default: 'text-sm sm:text-base',
      sm: 'text-xs sm:text-sm',
      smf: 'text-sm',
      xsf: 'text-xs'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

interface ITextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = forwardRef<HTMLParagraphElement, ITextProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p ref={ref} {...props} className={cn(textVariants({ size, className }))}>
        {children}
      </p>
    )
  }
)

Text.displayName = 'Text'

export { Text, textVariants }
