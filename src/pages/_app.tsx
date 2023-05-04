import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '~/styles/globals.css'

import { cn } from '~/libs/utils'

import Providers from '~/components/common/Providers'
import MainLayout from '~/components/layouts/MainLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <main>
            <Component {...pageProps} />
          </main>
        </MainLayout>
        <Toaster
          position='top-center'
          reverseOrder={true}
          toastOptions={{
            className: cn('rounded-sm text-center'),
            duration: 2500
          }}
        />
      </QueryClientProvider>
    </Providers>
  )
}
