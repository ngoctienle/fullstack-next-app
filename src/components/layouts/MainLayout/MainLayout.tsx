import { Roboto } from 'next/font/google'

import { cn } from '~/libs/utils'

import Footer from '~/components/frontend/Footer'
import Header from '~/components/frontend/Header'

interface IMainLayout {
  children: React.ReactNode
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

export default function MainLayout({ children }: IMainLayout) {
  return (
    <section
      className={cn(roboto.className, 'h-screen max-w-[100vw] overflow-x-visible')}
      id='page-layout'
    >
      <Header />
      {children}
      <Footer />
    </section>
  )
}
