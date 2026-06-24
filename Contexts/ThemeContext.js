import { createContext, useState } from 'react'

export const ThemeContexts = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('isDarkMode'))
  )

  return (
    <ThemeContexts.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeContexts.Provider>
  )
}