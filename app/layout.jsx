import TOMOStudioHead from '@/components/utils/tomostudio-insert'
import Wrapper from './wrapper'
import '@/styles/main.scss'

export const metadata = {
  metadataBase: new URL("https://quiz.herbana.id"),
  title: {
    default: 'Herbana',
    template: '%s | Herbana',
  },
  icons: {
    icon: "/favicon.ico",
  },
}


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <TOMOStudioHead />
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export default RootLayout
