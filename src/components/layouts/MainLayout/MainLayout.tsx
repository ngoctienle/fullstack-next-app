import localFont from 'next/font/local'

import { cn } from '@/libs/utils'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

const neuePlak = localFont({
  src: [
    {
      path: '../../../fonts/SVN-NeuePlakBold.otf',
      weight: '700'
    },
    {
      path: '../../../fonts/SVN-NeuePlakRegular.otf',
      weight: '400'
    }
  ],
  display: 'swap',
  variable: '--font-neuePlak'
})

const neueWide = localFont({
  src: '../../../fonts/SVN-NeuePlakWideBold.otf',
  weight: '700',
  display: 'swap',
  variable: '--font-neueWide'
})

interface IMainLayout {
  children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
  return (
    <section className={cn(`${neuePlak.variable} ${neueWide.variable} font-base`)} id='page-layout'>
      <Header />
      {children}
      <Footer />
    </section>
  )
}
