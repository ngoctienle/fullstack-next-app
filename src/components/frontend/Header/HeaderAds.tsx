import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useMediaQuery } from '~/hooks'

import Text from '~/components/common/Text'

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
  )
}
