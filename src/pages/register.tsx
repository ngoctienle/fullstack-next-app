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

interface IRegisterProps {
  providers: IProvider[] | null
}

export default function Register({ providers }: IRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema)
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div id='page-login' className='py-10'>
      <div className='container'>
        <div className='flex items-center justify-start gap-3'>
          <Link
            href='/login'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'border border-slate-200 p-0 w-10 rounded-full'
            )}
          >
            <ArrowLeftIcon className='w-5 h-5 inline-block text-slate-700' />
          </Link>
          <Text size='sm'>Quay lại Đăng nhập!</Text>
        </div>
        <div className='max-w-[500px] mx-auto mt-5'>
          <Heading size='default' className='uppercase text-center'>
            đăng ký
          </Heading>
          <Text size='xs' className='mt-3 mb-6'>
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
            <div className='flex mt-3'>
              <Button type='submit' size='lg' className='mx-auto'>
                Đăng Ký
              </Button>
            </div>
            <Text size={'xs'} className='mt-3'>
              Bạn đã có tài khoản?{' '}
              <Link
                href='/login'
                className={cn(
                  textVariants({ size: 'xs' }),
                  'hover:underline hover:underline-offset-2'
                )}
              >
                Đăng nhập ngay
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

export const getServerSideProps: GetServerSideProps<IRegisterProps> = async () => {
  const data = await getProviders()
  const providers = data && Object.values(data)

  return {
    props: {
      providers
    }
  }
}
