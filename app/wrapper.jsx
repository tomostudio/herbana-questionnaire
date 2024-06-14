'use client'

import { AppWrapper } from 'context/state'
import Script from 'next/script'

const Wrapper = ({ children }) => {
  return (
    <AppWrapper>
      <Script>
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-FBD33KFSRE');
`}
      </Script>
      {children}
    </AppWrapper>
  )
}

export default Wrapper
