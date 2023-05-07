import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { Button } from '@/ui/button'
import CImage from '@/ui/c-image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { Text } from '@/ui/text'
import { cn } from '@/libs/utils'

export default function HeaderMain() {
  const { data: session } = useSession()

  return (
    <header>
      <div className='container'>
        <div className='flex h-16 justify-between'>
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
              className='relative h-10 w-[300px] overflow-hidden rounded-md border border-slate-200 bg-slate-50 px-4 transition-colors focus-within:border-slate-700 hover:border-slate-700'
            >
              <input
                type='text'
                className='h-full w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-sm dark:text-slate-300'
                placeholder='Giảm 50K + Hoàn tiền đến 300K'
              />
              <SearchIcon className='absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-700 dark:text-slate-300' />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <UserIcon className='h-5 w-5 text-slate-700 dark:text-slate-300' />
                  <Text size='smf' className='ml-1.5'>
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
                        <div className='flex h-[40px] w-[40px] items-center justify-center rounded-full bg-slate-100'>
                          <UserIcon />
                        </div>
                      )}
                      <div className='flex flex-col'>
                        <Text size='smf' className='text-left'>
                          Xin chào! <span className='font-semibold'>{session.user?.name}</span>
                        </Text>
                        <Button
                          variant='link'
                          asChild
                          onClick={() => signOut()}
                          className={cn('h-fit p-0 text-xs underline-offset-2')}
                        >
                          <Text size='xsf' className='ml-auto max-w-max cursor-pointer'>
                            Đăng xuất
                          </Text>
                        </Button>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <Link href='/account'>
                        <Text size={'smf'} className='text-left'>
                          Thông tin tài khoản
                        </Text>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <Link href='/account'>
                        <Text size='smf' className='text-left'>
                          Đơn hàng của tôi
                        </Text>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <Link href='/account'>
                        <Text size='smf' className='text-left'>
                          Danh sách yêu thích
                        </Text>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Text size='smf' className='p-2'>
                      Vui lòng đăng nhập để xem nhiều thông tin hơn!
                    </Text>
                    <DropdownMenuSeparator />
                    <div className='flex items-center justify-around p-2'>
                      <Button onClick={() => signIn()} variant='outline'>
                        Đăng nhập
                      </Button>
                      <Button asChild>
                        <Link href='/register'>Đăng ký</Link>
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant='ghost'>
              <HeartIcon className='h-5 w-5 text-slate-700 dark:text-slate-300' />
            </Button>
            <Button variant='ghost'>
              <ShoppingCartIcon className='h-5 w-5 text-slate-700 dark:text-slate-300' />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
