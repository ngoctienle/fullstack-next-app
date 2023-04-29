import type { AppProps } from 'next/app'
import '~/styles/globals.css'

import Providers from '~/components/common/Providers'
import MainLayout from '~/components/layouts/MainLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MainLayout>
        <main>
          <Component {...pageProps} />
        </main>
      </MainLayout>
    </Providers>
  )
}
