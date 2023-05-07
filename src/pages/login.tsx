import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignInOptions, getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ArrowLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { cn } from '@/libs/utils'

import { FormSchema, formSchema } from '@/libs/validators'
import { IProvider } from '@/types/auth.type'

import { Button } from '@/ui/button'
import { Text } from '@/ui/text'
import CImage from '@/ui/c-image'
import Input from '@/ui/input'
import Heading from '@/ui/heading'
import AsyncButton from '@/components/AsyncButton'

interface ILoginProps {
  providers: IProvider[] | null
  csrfToken?: string
  callbackUrl?: string | string[]
}

type FormLoginSchema = Pick<FormSchema, 'email' | 'password'>
const loginFormSchema = formSchema.pick(['email', 'password'])

export default function Login({ providers, callbackUrl, csrfToken }: ILoginProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormLoginSchema>({
    resolver: yupResolver(loginFormSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (options: SignInOptions) => signIn('credentials', options)
  })

  const onSubmit = handleSubmit((data) => {
    const options = {
      redirect: false,
      email: data.email,
      password: data.password
    }
    loginMutation.mutate(options, {
      onSuccess: (data) => {
        if (data?.ok) {
          toast.success('Đăng nhập thành công!')
          router.push(callbackUrl as string)
        } else {
          if (data?.error === 'Địa chỉ Email không tồn tại!') {
            setError('email', {
              message: data.error
            })
          }
          if (data?.error === 'Địa chỉ Email hoặc Mật khẩu không đúng!') {
            setError('email', {
              message: ''
            })
            setError('password', {
              message: data.error
            })
          }
        }
      }
    })
  })

  return (
    <div id='page-login' className='py-10'>
      <div className='container'>
        <div className='flex items-center justify-start gap-3'>
          <Button asChild variant='outline' className={cn('w-10 rounded-full p-0')}>
            <Link href='/'>
              <ArrowLeftIcon className='h-5 w-5' />
            </Link>
          </Button>
          <Text>Tiếp tục mua sắm!</Text>
        </div>
        <div className='mx-auto mt-5 max-w-[500px]'>
          <Heading className='text-center uppercase'>Đăng nhập</Heading>
          <Text size='smf' className='mb-6 mt-3'>
            Chào mừng bạn quay lại đăng nhập. Là khách hàng cũ, bạn có quyền truy cập vào tất cả
            thông tin đã lưu trước đây của mình.
          </Text>
          <form noValidate onSubmit={onSubmit} action='/api/auth/signin/email' method='POST'>
            <input type='hidden' name='csrfToken' defaultValue={csrfToken || undefined} />
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
            <div className='flex items-center justify-end'>
              <Button asChild variant='link' className='h-fit p-0'>
                <Link href='/'>Quên mật khẩu?</Link>
              </Button>
            </div>
            <div className='mt-3 flex items-center justify-center'>
              <AsyncButton type='submit' isLoading={loginMutation.isLoading}>
                Đăng Nhập
              </AsyncButton>
            </div>
            <Text size={'smf'} className='mt-3'>
              Bạn chưa có tài khoản?{' '}
              <Button asChild variant='link' className='h-fit p-0'>
                <Link href='/register'>Đi đến đăng ký</Link>
              </Button>
            </Text>
          </form>
          <div className='my-3 flex items-center gap-3'>
            <div className='h-[1px] flex-grow bg-slate-400' />
            <Text size='xsf' className='flex-shrink-0'>
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
                    Đăng nhập bằng {provider.name}
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

export const getServerSideProps: GetServerSideProps<ILoginProps> = async (context) => {
  const { req, query } = context
  const { callbackUrl } = query

  const session = await getSession({ req })
  const data = await getProviders()
  const providers = data && Object.values(data)

  if (session) {
    return {
      props: {
        providers
      },
      redirect: {
        destination: callbackUrl ?? '/'
      }
    }
  }
  const csrfToken = await getCsrfToken()

  return {
    props: {
      providers,
      csrfToken,
      callbackUrl: callbackUrl ?? '/'
    }
  }
}
