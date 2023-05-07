import { FC } from 'react'
import { Button, ButtonProps } from './ui/button'
import { Loader2 } from 'lucide-react'

interface IAsyncButtonProps extends ButtonProps {
  isLoading: boolean
}

const AsyncButton: FC<IAsyncButtonProps> = ({ isLoading, children }) => {
  return (
    <Button disabled={isLoading} size='lg'>
      {isLoading ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : null}
      {children}
    </Button>
  )
}

export default AsyncButton
