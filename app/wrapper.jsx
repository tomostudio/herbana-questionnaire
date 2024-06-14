'use client'

import { AppWrapper } from 'context/state'
import Script from 'next/script'

const Wrapper = ({ children }) => {
  return (
    <AppWrapper>
      {children}
    </AppWrapper>
  )
}

export default Wrapper
