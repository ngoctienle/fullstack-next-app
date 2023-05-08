import { FC } from 'react'
import { Loader2 } from 'lucide-react'

import { Button, ButtonProps } from '@/ui/button'

interface IAsyncButtonProps extends ButtonProps {
  isLoading: boolean
  isError?: boolean
}

const AsyncButton: FC<IAsyncButtonProps> = ({ isLoading, children, isError }) => {
  return (
    <Button disabled={isLoading || isError} size='lg'>
      {isLoading && !isError ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : null}
      {children}
    </Button>
  )
}

export default AsyncButton
