import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useMediaQuery } from '@/libs/function'

import { Text } from '@/ui/text'

export default function HeaderAds() {
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
    <div className='flex h-[30px] items-center bg-[#ab2328] py-1'>
      <div className='container'>
        {isMedium ? (
          <div className='flex items-center justify-center gap-7'>
            <Text size='xsf' className='whitespace-nowrap text-white' role='presentation'>
              FREESHIP TOÀN BỘ ĐƠN HÀNG 1.5 TRIỆU VNĐ
            </Text>
            <span id='separator' className='h-0.5 w-0.5 rounded-full bg-white' />
            <Text size='xsf' className='whitespace-nowrap text-white' role='presentation'>
              ĐỔI HÀNG TRONG VÒNG 07 NGÀY
            </Text>
            <span id='separator' className='h-0.5 w-0.5 rounded-full bg-white' />
            <Text size='xsf' className='whitespace-nowrap text-white' role='presentation'>
              MUA TRƯỚC TRẢ TIỀN SAU LÃI SUẤT 0%
            </Text>
            <span id='separator' className='h-0.5 w-0.5 rounded-full bg-white' />
            <Text size='xsf' className='whitespace-nowrap text-white' role='presentation'>
              GIẢM 100K CHO KHÁCH HÀNG MỚI
            </Text>
          </div>
        ) : (
          <Slider {...settings}>
            <Text
              size='xsf'
              className='max-w-full whitespace-nowrap text-white'
              role='presentation'
            >
              FREESHIP TOÀN BỘ ĐƠN HÀNG 1.5 TRIỆU VNĐ
            </Text>
            <Text
              size='xsf'
              className='max-w-full whitespace-nowrap text-white'
              role='presentation'
            >
              ĐỔI HÀNG TRONG VÒNG 07 NGÀY
            </Text>
            <Text
              size='xsf'
              className='max-w-full whitespace-nowrap text-white'
              role='presentation'
            >
              MUA TRƯỚC TRẢ TIỀN SAU LÃI SUẤT 0%
            </Text>
            <Text size='xsf' className='whitespace-nowrap text-white' role='presentation'>
              GIẢM 100K CHO KHÁCH HÀNG MỚI
            </Text>
          </Slider>
        )}
      </div>
    </div>
  )
}
