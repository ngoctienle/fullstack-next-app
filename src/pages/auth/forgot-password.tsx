import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import authApi from '@/apis/auth.api'
import { IResponseAPI } from '@/libs/http'
import { cn, isAxiosError } from '@/libs/utils'
import { FormSchema, formSchema } from '@/libs/validators'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Text } from '@/ui/text'
import Heading from '@/ui/heading'
import AsyncButton from '@/components/AsyncButton'

type FormForgotSchema = Pick<FormSchema, 'email'>
const forgotFormSchema = formSchema.pick(['email'])

export default function ForgotPwPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormForgotSchema>({
    resolver: yupResolver(forgotFormSchema)
  })

  const forgotMutation = useMutation({
    mutationFn: (email: string) => authApi.ForgotPassword(email)
  })

  const onSubmit = handleSubmit((data) => {
    forgotMutation.mutate(data.email, {
      onSuccess: (data) => {
        reset()
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosError<IResponseAPI>(error)) {
          const formError = error.response?.data
          setError('email', {
            message: formError?.message
          })
        } else {
          toast.error('Vui lòng thử lại!')
        }
      }
    })
  })
  return (
    <div id='page-auth-forgot' className='py-10'>
      <div className='container'>
        <div className='flex items-center justify-start gap-3'>
          <Button asChild variant='outline' className={cn('w-10 rounded-full p-0')}>
            <Link href='/login'>
              <ArrowLeftIcon className='h-5 w-5' />
            </Link>
          </Button>
          <Text>Quay về Đăng nhập!</Text>
        </div>
        <div className='mx-auto mt-5 max-w-[500px]'>
          <Heading className='text-center uppercase'>Quên Mật Khẩu</Heading>
          <form noValidate onSubmit={onSubmit} className='mt-5'>
            <Input
              type='email'
              name='email'
              placeholder='Địa chỉ Email'
              errorMessage={errors.email?.message}
              register={register}
            />
            <div className='mt-3 flex items-center justify-center'>
              <AsyncButton isLoading={forgotMutation.isLoading}>Tiếp tục</AsyncButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
