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
  DropdownMenuTrigger
} from '~/components/common/DropdownMenu'
import Text from '~/components/common/Text'

export default function HeaderTop() {
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
      <div className='bg-white h-[30px] flex items-center'>
        <div className='container'>
          <div className='flex justify-end items-center gap-2'>
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
          <div className='h-16'></div>
        </div>
      </header>
    </>
  )
}
