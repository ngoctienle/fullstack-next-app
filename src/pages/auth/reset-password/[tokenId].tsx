import Link from 'next/link'
import { GetServerSideProps } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ArrowLeftIcon } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import authApi from '@/apis/auth.api'

import Token from '@/database/models/token'
import dbConnect from '@/database/dbConnect'

import { FormSchema, formSchema } from '@/libs/validators'
import { cn, isAxiosError } from '@/libs/utils'
import { IResponseAPI } from '@/libs/http'

import { IBodyReset } from '@/types/auth.type'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Text } from '@/ui/text'
import Heading from '@/ui/heading'
import AsyncButton from '@/components/AsyncButton'

type FormResetSchema = Pick<FormSchema, 'password' | 'confirm_pw'>
const resetFormSchema = formSchema.pick(['password', 'confirm_pw'])

interface ResetPageProps {
  user_id: string
  validMessage: string
}

export default function ResetPage({ user_id, validMessage }: ResetPageProps) {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(validMessage)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormResetSchema>({
    resolver: yupResolver(resetFormSchema)
  })

  const resetMutation = useMutation({
    mutationFn: (body: IBodyReset) => authApi.ResetPassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    const { password } = data
    const body: IBodyReset = {
      user_id,
      password
    }

    resetMutation.mutate(body, {
      onSuccess: async (data) => {
        toast.success(data.data.message)
        router.push('/login')
      },
      onError: (error) => {
        if (isAxiosError<IResponseAPI>(error)) {
          const formError = error.response?.data
          setError(formError?.message)
        } else {
          toast.error('Vui lòng thử lại!')
        }
      }
    })
  })

  return (
    <div id='page-auth-reset' className='py-10'>
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
          <Heading className='text-center uppercase'>Đặt Lại Mật Khẩu</Heading>
          <form noValidate onSubmit={onSubmit} className='mt-5'>
            <Input
              type='password'
              name='password'
              placeholder='Mật khẩu'
              disabled={Boolean(error)}
              errorMessage={errors.password?.message}
              register={register}
            />
            <Input
              type='password'
              name='confirm_pw'
              placeholder='Xác nhận Mật khẩu'
              disabled={Boolean(error)}
              errorMessage={errors.confirm_pw?.message}
              register={register}
            />
            {error ? <span className='text-xs text-destructive'>{error}</span> : null}
            <div className='mt-3 flex items-center justify-center'>
              <AsyncButton isLoading={resetMutation.isLoading} isError={Boolean(error)}>
                Xác nhận
              </AsyncButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ResetPageProps> = async (context) => {
  const { query, req } = context
  const { tokenId } = query

  const session = await getSession({ req })
  if (session) {
    return {
      props: {
        user_id: '',
        validMessage: ''
      },
      redirect: {
        destination: '/'
      }
    }
  }

  try {
    await dbConnect()

    const dbToken = await Token.findOne({ token: tokenId })
    if (!dbToken) {
      return {
        props: {
          user_id: '',
          validMessage: 'Token không hợp lệ!'
        }
      }
    }
    if (dbToken.expiresAt < new Date()) {
      await dbToken.deleteOne()
      return {
        props: {
          user_id: '',
          validMessage: 'Token hết hạn!'
        }
      }
    }
    const tokenInfo = jwt.verify(
      tokenId as string,
      process.env.RESET_TOKEN_SECRET as string
    ) as JwtPayload
    console.log(tokenInfo.id)
    return {
      props: {
        user_id: tokenInfo.id,
        validMessage: ''
      }
    }
  } catch (error) {
    return {
      props: {
        user_id: '',
        validMessage: ''
      }
    }
  }
}
