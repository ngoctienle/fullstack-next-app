import { cva } from 'class-variance-authority'

export const textVariants = cva('max-w-prose text-slate-700 dark:text-slate-300 text-center', {
  variants: {
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm sm:text-base',
      xs: 'text-xs sm:text-sm',
      xxs: 'text-xs'
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

export const headingVariants = cva(
  'text-black dark:text-white font-sansWide leading-tight tracking-wide font-bold',
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

export const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md outline-none text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100',
        destructive: 'text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-200 dark:border-slate-700',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-2 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        xs: 'h-fit px-2 py-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
