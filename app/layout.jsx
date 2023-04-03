import Wrapper from './wrapper'
import '@/styles/main.scss'

export const metadata = {
  title: {
    default: 'Herbana',
    template: '%s | Herbana',
  },
}


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export default RootLayout
