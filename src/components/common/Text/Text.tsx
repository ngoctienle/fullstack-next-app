import { VariantProps } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

import { textVariants } from '~/configs/variants'

import { cn } from '~/libs/utils'

interface ITextProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

const Text = forwardRef<HTMLParagraphElement, ITextProps>(({ className, size, children, ...props }, ref) => {
  return (
    <p ref={ref} {...props} className={cn(textVariants({ size, className }))}>
      {children}
    </p>
  )
})

Text.displayName = 'Text'

export default Text
