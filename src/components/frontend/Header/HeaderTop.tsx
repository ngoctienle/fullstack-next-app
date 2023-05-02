import Link from 'next/link'

import { buttonVariants } from '~/configs/variants'

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
  return (
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
  )
}
