import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { buttonVariants } from '~/configs/variants'

import Button from '~/components/common/Button'
import CImage from '~/components/common/CImage'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/common/DropdownMenu'
import Text from '~/components/common/Text'

export default function HeaderMain() {
  const { data: session } = useSession()

  return (
    <header>
      <div className='container'>
        <div className='h-16 flex justify-between'>
          <Link href='/' className='inline-flex items-center'>
            <CImage
              src='/svg/logo.webp'
              alt='FSNECommerce'
              width={100}
              height={30}
              className='mr-2'
            />
            <h1 className='sr-only'>FSNECommerce</h1>
          </Link>
          <div className='flex items-center gap-2'>
            <form
              noValidate
              className='bg-slate-50 w-[300px] rounded-md overflow-hidden relative px-4 h-10 transition-colors border border-slate-200 hover:border-slate-700 focus-within:border-slate-700'
            >
              <input
                type='text'
                className='h-full w-full bg-transparent outline-none text-sm placeholder:text-sm text-slate-700 dark:text-slate-300'
                placeholder='Giảm 50K + Hoàn tiền đến 300K'
              />
              <SearchIcon className='w-5 h-5 text-slate-700 dark:text-slate-300 absolute top-1/2 -translate-y-1/2 right-4' />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <UserIcon className='w-5 h-5 text-slate-700 dark:text-slate-300' />
                  <Text size='xs' className='ml-1.5'>
                    {!session ? 'Tài khoản' : session.user?.name}
                  </Text>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' forceMount className='max-w-[300px]'>
                {session ? (
                  <>
                    <div className='flex items-center gap-3 p-2'>
                      {session.user?.image ? (
                        <CImage
                          src={session.user.image}
                          alt={session.user.name as string}
                          className='rounded-full'
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className='w-[40px] h-[40px] bg-slate-100 rounded-full flex items-center justify-center'>
                          <UserIcon />
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <Text size={'xs'} className='text-left'>
                          Xin chào! <span className='font-semibold'>{session.user?.name}</span>
                        </Text>
                        <Text
                          size={'xxs'}
                          className='ml-auto cursor-pointer max-w-max'
                          onClick={() => signOut()}
                        >
                          Đăng xuất
                        </Text>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href='/account'>
                      <DropdownMenuItem>
                        <Text size={'xs'} className='text-left'>
                          Thông tin tài khoản
                        </Text>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href='/account'>
                      <DropdownMenuItem>
                        <Text size={'xs'} className='text-left'>
                          Đơn hàng của tôi
                        </Text>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href='/account'>
                      <DropdownMenuItem>
                        <Text size={'xs'} className='text-left'>
                          Danh sách yêu thích
                        </Text>
                      </DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <Text size='xs' className='p-2'>
                      Vui lòng đăng nhập để xem nhiều thông tin hơn!
                    </Text>
                    <DropdownMenuSeparator />
                    <div className='flex items-center justify-around p-2'>
                      <Button onClick={() => signIn()} variant='ghost'>
                        <DropdownMenuItem className='p-0'>
                          <Text size={'xs'}>Đăng nhập</Text>
                        </DropdownMenuItem>
                      </Button>
                      <Link href='/register' className={buttonVariants({ variant: 'outline' })}>
                        <DropdownMenuItem className='p-0 focus:bg-transparent'>
                          <Text size={'xs'} className='text-white'>
                            Đăng ký
                          </Text>
                        </DropdownMenuItem>
                      </Link>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant='ghost'>
              <HeartIcon className='w-5 h-5 text-slate-700 dark:text-slate-300' />
            </Button>
            <Button variant='ghost'>
              <ShoppingCartIcon className='w-5 h-5 text-slate-700 dark:text-slate-300' />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
