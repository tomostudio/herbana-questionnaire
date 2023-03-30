import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [scrollState, setScrollState] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [status, setStatus] = useState('progress')

  return (
    <AppContext.Provider
      value={{
        scrollState,
        setScrollState,
        currentSection,
        setCurrentSection,
        currentQuestion,
        setCurrentQuestion,
        status,
        setStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
