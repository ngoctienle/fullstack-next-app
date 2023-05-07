import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeftIcon } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import authApi from '@/apis/auth.api'
import { IResponseAPI } from '@/libs/http'
import { FormSchema, formSchema } from '@/libs/rules'
import { cn, isAxiosError } from '@/libs/utils'

import { IBodyRegister, IProvider } from '@/types/auth.type'

import { Text } from '@/ui/text'
import { Button } from '@/ui/button'
import Heading from '@/ui/heading'
import Input from '@/ui/input'
import CImage from '@/ui/c-image'
import AsyncButton from '@/components/AsyncButton'

interface IRegisterProps {
  providers: IProvider[] | null
}

export default function Register({ providers }: IRegisterProps) {
  const router = useRouter()
  const registerMutation = useMutation({
    mutationFn: (body: IBodyRegister) => authApi.RegisterAccount(body)
  })
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    const { email, fullname, password } = data

    registerMutation.mutate(
      { email, name: fullname, password },
      {
        onSuccess: (data) => {
          reset()
          router.push('/login')
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
      }
    )
  })

  return (
    <div id='page-login' className='py-10'>
      <div className='container'>
        <div className='flex items-center justify-start gap-3'>
          <Button asChild variant='outline' className={cn('w-10 rounded-full p-0')}>
            <Link href='/login'>
              <ArrowLeftIcon className='h-5 w-5' />
            </Link>
          </Button>
          <Text>Quay lại Đăng nhập!</Text>
        </div>
        <div className='mx-auto mt-5 max-w-[500px]'>
          <Heading className='text-center uppercase'>đăng ký</Heading>
          <Text size='smf' className='mb-6 mt-3'>
            Hãy tạo tài khoản của bạn và tiếp tục tận hưởng cảm giác mua sắm tuyệt vời với muôn vàn
            ưu đãi!
          </Text>
          <form noValidate onSubmit={onSubmit}>
            <Input
              type='text'
              name='fullname'
              placeholder='Họ và tên'
              errorMessage={errors.fullname?.message}
              register={register}
            />
            <Input
              type='email'
              name='email'
              placeholder='Địa chỉ Email'
              errorMessage={errors.email?.message}
              register={register}
            />
            <Input
              type='password'
              name='password'
              placeholder='Mật khẩu'
              errorMessage={errors.password?.message}
              register={register}
            />
            <Input
              type='password'
              name='confirm_pw'
              placeholder='Xác nhận Mật khẩu'
              errorMessage={errors.confirm_pw?.message}
              register={register}
            />
            <div className='mt-3 flex items-center justify-center'>
              <AsyncButton type='submit' isLoading={registerMutation.isLoading}>
                Đăng Ký
              </AsyncButton>
            </div>
            <Text size={'smf'} className='mt-3'>
              Bạn đã có tài khoản?{' '}
              <Button asChild variant='link' className='h-fit p-0'>
                <Link href='/login'>Đăng nhập ngay</Link>
              </Button>
            </Text>
          </form>
          <div className='my-3 flex items-center gap-3'>
            <div className='h-[1px] flex-grow bg-slate-400' />
            <Text size={'xsf'} className='flex-shrink-0'>
              Hoặc
            </Text>
            <div className='h-[1px] flex-grow bg-slate-400' />
          </div>
          <div className='mb-5 flex flex-col gap-3'>
            {providers?.map((provider) => {
              if (provider.id !== 'credentials') {
                return (
                  <Button key={provider.id} variant='outline' onClick={() => signIn(provider.id)}>
                    <CImage
                      src={`/svg/${provider.id}.svg`}
                      alt={provider.name}
                      width={30}
                      height={30}
                      className='mr-3 aspect-square'
                    />
                    Đăng ký bằng {provider.name}
                  </Button>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IRegisterProps> = async () => {
  const data = await getProviders()
  const providers = data && Object.values(data)

  return {
    props: {
      providers
    }
  }
}
