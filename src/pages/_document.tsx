import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

import { cn } from '~/libs/utils'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }
  render(): JSX.Element {
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
}
