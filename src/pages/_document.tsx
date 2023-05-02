import { Head, Html, Main, NextScript } from 'next/document'

import { cn } from '~/libs/utils'

export default function Document() {
  return (
    <Html lang='en' className={cn('bg-white text-slate-900 antialiased')}>
      <Head>
        <link
          rel='preload'
          href='/fonts/SVN-NeuePlakRegular.otf'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/SVN-NeuePlakBold.otf'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/SVN-NeuePlakWideBold.otf'
          as='font'
          type='font/otf'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
