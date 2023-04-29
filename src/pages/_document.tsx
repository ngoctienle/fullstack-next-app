import { Head, Html, Main, NextScript } from 'next/document'

import { cn } from '~/libs/utils'

export default function Document() {
  return (
    <Html lang='en' className={cn('bg-white text-slate-900 antialiased')}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
