import { cn } from '~/libs/utils'

import Footer from '~/components/frontend/Footer'
import Header from '~/components/frontend/Header'

interface IMainLayout {
  children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
  return (
    <section className={cn('h-screen max-w-[100vw] overflow-x-visible font-sans')} id='page-layout'>
      <Header />
      {children}
      <Footer />
    </section>
  )
}
