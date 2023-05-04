import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

import { cn } from '~/libs/utils'

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    { className, classNameInput, classNameError, errorMessage, register, rules, name, ...props },
    ref
  ) => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const registerResult = register && name ? register(name, rules) : null

    const toggleVisible = () => {
      setVisible((prev) => !prev)
    }

    const handleType = () => {
      if (props.type === 'password') {
        return visible ? 'text' : 'password'
      }
      return props.type
    }

    return (
      <>
        <div className={cn('relative', className)}>
          <input
            ref={ref}
            className={cn(
              'flex h-10 w-full transition-colors rounded-md border bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-transparent focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50',
              errorMessage || errorMessage?.length === 0
                ? 'border-error dark:border-error focus:ring-error dark:focus:ring-error'
                : 'border-slate-300 dark:border-slate-700 focus:ring-slate-400 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
              classNameInput
            )}
            {...registerResult}
            {...props}
            type={handleType()}
          />
          {props.type === 'password' && visible && (
            <EyeIcon
              type='button'
              className='absolute w-4 h-4 top-1/2 -translate-y-1/2 cursor-pointer right-3'
              onClick={toggleVisible}
            />
          )}
          {props.type === 'password' && !visible && (
            <EyeOffIcon
              type='button'
              className='absolute w-4 h-4 top-1/2 -translate-y-1/2 cursor-pointer right-3'
              onClick={toggleVisible}
            />
          )}
        </div>
        <p className={cn('text-xs text-error min-h-[1rem] my-[3px]', classNameError)}>
          {errorMessage}
        </p>
      </>
    )
  }
)

Input.displayName = 'Input'

export default Input
