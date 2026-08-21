'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'premium' | 'professional' | 'classic' | 'modern'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'modern',
  setTheme: () => {},
})

export function ThemeProvider({ children, initialTheme = 'modern' }: { children: ReactNode; initialTheme?: Theme }) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('haven-theme', newTheme)
  }

  useEffect(() => {
    const stored = localStorage.getItem('haven-theme') as Theme | null
    const active = stored || initialTheme
    setThemeState(active)
    document.documentElement.setAttribute('data-theme', active)
  }, [initialTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
