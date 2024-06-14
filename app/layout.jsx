import TOMOStudioHead from '@/components/utils/tomostudio-insert'
import Wrapper from './wrapper'
import '@/styles/main.scss'
import { GoogleAnalytics } from '@next/third-parties/google'

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
      </head>
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
      <GoogleAnalytics gaId="G-FBD33KFSRE" />
    </html>
  )
}

export default RootLayout
