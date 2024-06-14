import TOMOStudioHead from '@/components/utils/tomostudio-insert'
import Wrapper from './wrapper'
import '@/styles/main.scss'

export const metadata = {
  metadataBase: new URL('https://quiz.herbana.id'),
  title: {
    default: 'Herbana',
    template: '%s | Herbana',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <TOMOStudioHead />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FBD33KFSRE"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FBD33KFSRE');
          `}
        </script>
      </head>
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export default RootLayout
