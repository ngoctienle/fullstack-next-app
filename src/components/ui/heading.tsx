import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/libs/utils'

export const headingVariants = cva(
  'text-black dark:text-white font-wide leading-tight tracking-wide font-bold',
  {
    variants: {
      size: {
        default: 'md:text-[26px] text-2xl',
        md: 'md:text-base text-sm',
        sm: 'text-sm'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

interface IHeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <h2 ref={ref} {...props} className={cn(headingVariants({ size, className }))}>
        {children}
      </h2>
    )
  }
)

Heading.displayName = 'Heading'

export default Heading
