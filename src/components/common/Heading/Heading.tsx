import { VariantProps } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

import { headingVariants } from '~/configs/variants'

import { cn } from '~/libs/utils'

interface IHeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(({ className, size, children, ...props }, ref) => {
  return (
    <h2 ref={ref} {...props} className={cn(headingVariants({ size, className }))}>
      {children}
    </h2>
  )
})

Heading.displayName = 'Heading'

export default Heading
