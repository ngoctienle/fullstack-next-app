import FooterCR from './FooterCR'
import Link from 'next/link'

import CImage from '~/components/common/CImage'
import Heading from '~/components/common/Heading'

export default function Footer() {
  return (
    <div id='page-footer'>
      <div className='py-5 border-t border-t-slate-200'>
        <div className='container'>
          <div className='flex @520:flex-row flex-col @520:items-center @520:justify-between gap-[10px]'>
            <div className='flex @992:flex-row flex-col @992:items-center items-start gap-[10px]'>
              <Heading size='sm' className='uppercase'>
                phương thức thanh toán
              </Heading>
              <div className='flex items-center gap-4'>
                <CImage
                  src='/svg/visa.webp'
                  alt='Phương thức thanh toán'
                  width={44}
                  height={24}
                  className='w-auto'
                />
                <CImage
                  src='/svg/credit.webp'
                  alt='Phương thức thanh toán'
                  width={44}
                  height={24}
                  className='w-auto'
                />
                <CImage
                  src='/svg/napas.webp'
                  alt='Phương thức thanh toán'
                  width={44}
                  height={24}
                  className='w-auto'
                />
                <CImage
                  src='/svg/cod.webp'
                  alt='Phương thức thanh toán'
                  width={44}
                  height={24}
                  className='w-auto'
                />
              </div>
            </div>
            <Link href='/'>
              <CImage src='/svg/verified.png' alt='Verified' width={122} height={46} />
            </Link>
          </div>
        </div>
      </div>
      <FooterCR />
    </div>
  )
}
