import Link from 'next/link'

import CImage from '@/components/ui/c-image'
import Heading from '@/components/ui/heading'
import FooterCR from './FooterCR'

export default function Footer() {
  return (
    <div id='page-footer'>
      <div className='border-t border-t-slate-200 py-3 @992:py-5'>
        <div className='container'>
          <div className='flex flex-col gap-[10px] @520:flex-row @520:items-center @520:justify-between'>
            <div className='flex flex-col items-start gap-[10px] @992:flex-row @992:items-center'>
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
