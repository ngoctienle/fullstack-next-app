import { Button } from '@/ui/button'
import Link from 'next/link'

import CImage from '@/ui/c-image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/ui/dropdown-menu'
import { Text } from '@/ui/text'

export default function HeaderTop() {
  return (
    <div className='flex items-center bg-white'>
      <div className='container'>
        <div className='flex items-center justify-end gap-2'>
          <Button variant='link' asChild>
            <Link href='/'>Blogs</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/'>Trợ giúp</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/'>Theo dõi đơn hàng</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/'>Hệ thống cửa hàng</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <CImage src='/svg/vietnam.svg' alt='language' width={20} height={20} />
                <Text size='smf' className='ml-1.5'>
                  Tiếng Việt
                </Text>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' forceMount>
              <DropdownMenuItem>
                <CImage src='/svg/vietnam.svg' alt='language' width={20} height={20} />
                <Text size='smf' className='ml-1.5'>
                  Tiếng Việt
                </Text>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CImage src='/svg/english.svg' alt='language' width={20} height={20} />
                <Text size='smf' className='ml-1.5'>
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
