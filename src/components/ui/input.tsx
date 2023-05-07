import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

import { cn } from '@/libs/utils'

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
              'flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm text-primary transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              errorMessage || errorMessage?.length === 0
                ? 'border border-destructive'
                : 'border-slate-300 hover:border-primary focus:border-primary dark:border-slate-700',
              classNameInput
            )}
            {...registerResult}
            {...props}
            type={handleType()}
          />
          {props.type === 'password' && visible && (
            <EyeIcon
              type='button'
              className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer'
              onClick={toggleVisible}
            />
          )}
          {props.type === 'password' && !visible && (
            <EyeOffIcon
              type='button'
              className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer'
              onClick={toggleVisible}
            />
          )}
        </div>
        <p className={cn('my-[3px] min-h-[1rem] text-xs text-destructive', classNameError)}>
          {errorMessage}
        </p>
      </>
    )
  }
)

Input.displayName = 'Input'

export default Input
