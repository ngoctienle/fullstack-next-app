import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { buttonVariants } from '~/configs/variants'

import { useMediaQuery } from '~/hooks'

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

export default function HeaderTop() {
  const { data: session } = useSession()
  const isMedium = useMediaQuery('(min-width: 1060px)')
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    cssEase: 'linear'
  }

  return (
    <>
      <div className='bg-[#ab2328] py-1 h-[30px] flex items-center'>
        <div className='container'>
          {isMedium ? (
            <div className='flex items-center gap-7 justify-center'>
              <Text size='xxs' className='whitespace-nowrap text-white' role='presentation'>
                FREESHIP TOÀN BỘ ĐƠN HÀNG 1.5 TRIỆU VNĐ
              </Text>
              <span id='separator' className='w-0.5 h-0.5 rounded-full bg-white' />
              <Text size='xxs' className='whitespace-nowrap text-white' role='presentation'>
                ĐỔI HÀNG TRONG VÒNG 07 NGÀY
              </Text>
              <span id='separator' className='w-0.5 h-0.5 rounded-full bg-white' />
              <Text size='xxs' className='whitespace-nowrap text-white' role='presentation'>
                MUA TRƯỚC TRẢ TIỀN SAU LÃI SUẤT 0%
              </Text>
              <span id='separator' className='w-0.5 h-0.5 rounded-full bg-white' />
              <Text size='xxs' className='whitespace-nowrap text-white' role='presentation'>
                GIẢM 100K CHO KHÁCH HÀNG MỚI
              </Text>
            </div>
          ) : (
            <Slider {...settings}>
              <Text
                size='xxs'
                className='whitespace-nowrap text-white max-w-full'
                role='presentation'
              >
                FREESHIP TOÀN BỘ ĐƠN HÀNG 1.5 TRIỆU VNĐ
              </Text>
              <Text
                size='xxs'
                className='whitespace-nowrap text-white max-w-full'
                role='presentation'
              >
                ĐỔI HÀNG TRONG VÒNG 07 NGÀY
              </Text>
              <Text
                size='xxs'
                className='whitespace-nowrap text-white max-w-full'
                role='presentation'
              >
                MUA TRƯỚC TRẢ TIỀN SAU LÃI SUẤT 0%
              </Text>
              <Text size='xxs' className='whitespace-nowrap text-white' role='presentation'>
                GIẢM 100K CHO KHÁCH HÀNG MỚI
              </Text>
            </Slider>
          )}
        </div>
      </div>
      <div className='bg-white flex items-center'>
        <div className='container'>
          <div className='flex justify-end items-center gap-2 h-[30px]'>
            <Link href='/' className={buttonVariants({ variant: 'link', size: 'xs' })}>
              Blogs
            </Link>
            <Link href='/' className={buttonVariants({ variant: 'link', size: 'xs' })}>
              Trợ giúp
            </Link>
            <Link href='/' className={buttonVariants({ variant: 'link', size: 'xs' })}>
              Theo dõi đơn hàng
            </Link>
            <Link href='/' className={buttonVariants({ variant: 'link', size: 'xs' })}>
              Hệ thống cửa hàng
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='xs'>
                  <CImage src='/svg/vietnam.svg' alt='language' width={20} height={20} />
                  <Text size='xs' className='ml-1.5'>
                    Tiếng Việt
                  </Text>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' forceMount>
                <DropdownMenuItem>
                  <CImage src='/svg/vietnam.svg' alt='language' width={20} height={20} />
                  <Text size='xs' className='ml-1.5'>
                    Tiếng Việt
                  </Text>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CImage src='/svg/english.svg' alt='language' width={20} height={20} />
                  <Text size='xs' className='ml-1.5'>
                    Tiếng Anh
                  </Text>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
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
            <div className='flex items-center gap-3'>
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
                          <div className='w-[40px] h-[40px] rounded-full'>
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
                      <DropdownMenuItem>
                        <Link href='/account'>
                          <Text size={'xs'} className='text-left'>
                            Thông tin tài khoản
                          </Text>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href='/account'>
                          <Text size={'xs'} className='text-left'>
                            Đơn hàng của tôi
                          </Text>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href='/account'>
                          <Text size={'xs'} className='text-left'>
                            Danh sách yêu thích
                          </Text>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Text size='xs' className='p-2'>
                        Vui lòng đăng nhập để xem nhiều thông tin hơn!
                      </Text>
                      <DropdownMenuSeparator />
                      <div className='flex items-center justify-around p-2'>
                        <Link href='/login' className={buttonVariants({ variant: 'ghost' })}>
                          <Text size={'xs'}>Đăng nhập</Text>
                        </Link>
                        <Link href='/register' className={buttonVariants({ variant: 'outline' })}>
                          <Text size={'xs'} className='text-white'>
                            Đăng ký
                          </Text>
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
    </>
  )
}
