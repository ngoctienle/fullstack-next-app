import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeftIcon } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { buttonVariants, textVariants } from '~/configs/variants'

import { FormSchema, formSchema } from '~/libs/rules'
import { cn } from '~/libs/utils'

import { IProvider } from '~/types/auth.type'

import Button from '~/components/common/Button'
import CImage from '~/components/common/CImage'
import Heading from '~/components/common/Heading'
import Input from '~/components/common/Input'
import Text from '~/components/common/Text'

interface ILoginProps {
  providers: IProvider[] | null
}

type FormLoginSchema = Pick<FormSchema, 'email' | 'password'>
const loginFormSchema = formSchema.pick(['email', 'password'])

export default function Login({ providers }: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLoginSchema>({
    resolver: yupResolver(loginFormSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div id='page-login' className='py-10'>
      <div className='container'>
        <div className='flex items-center justify-start gap-3'>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'border border-slate-200 p-0 w-10 rounded-full'
            )}
          >
            <ArrowLeftIcon className='w-5 h-5 inline-block text-slate-700' />
          </Link>
          <Text size='sm'>Tiếp tục mua sắm!</Text>
        </div>
        <div className='max-w-[500px] mx-auto mt-5'>
          <Heading size='default' className='uppercase text-center'>
            Đăng nhập
          </Heading>
          <Text size='xs' className='mt-3 mb-6'>
            Chào mừng bạn quay lại đăng nhập. Là khách hàng cũ, bạn có quyền truy cập vào tất cả
            thông tin đã lưu trước đây của mình.
          </Text>
          <form noValidate onSubmit={onSubmit}>
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
            <Link
              href='/'
              className={cn(
                textVariants({ size: 'xs' }),
                'block max-w-max ml-auto hover:underline hover:underline-offset-2'
              )}
            >
              Quên mật khẩu?
            </Link>
            <div className='flex mt-5'>
              <Button type='submit' size='lg' className='mx-auto'>
                Đăng Nhập
              </Button>
            </div>
            <Text size={'xs'} className='mt-3'>
              Bạn chưa có tài khoản?{' '}
              <Link
                href='/register'
                className={cn(
                  textVariants({ size: 'xs' }),
                  'hover:underline hover:underline-offset-2'
                )}
              >
                Đi đến đăng ký
              </Link>
            </Text>
          </form>
          <div className='flex items-center gap-3 my-3'>
            <div className='flex-grow h-[1px] bg-slate-400' />
            <Text size='xxs' className='flex-shrink-0'>
              Hoặc
            </Text>
            <div className='flex-grow h-[1px] bg-slate-400' />
          </div>
          <div className='flex flex-col gap-3 mb-5'>
            {providers?.map((provider) => (
              <Button
                key={provider.id}
                variant='ghost'
                className='border border-slate-200'
                onClick={() => signIn(provider.id)}
              >
                <CImage
                  src={`/svg/${provider.id}.svg`}
                  alt={provider.name}
                  width={30}
                  height={30}
                  className='mr-3 aspect-square'
                />
                Đăng nhập với {provider.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ILoginProps> = async () => {
  const data = await getProviders()
  const providers = data && Object.values(data)

  return {
    props: {
      providers
    }
  }
}
