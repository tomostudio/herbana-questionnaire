import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [scrollState, setScrollState] = useState(null)
  const [changeQuestion, setChangeQuestion] = useState(false)

  return (
    <AppContext.Provider
      value={{
        scrollState,
        setScrollState,
        changeQuestion,
        setChangeQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
