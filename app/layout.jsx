import Wrapper from './wrapper'
import '@/styles/main.scss'

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
