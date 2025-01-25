// components/theme-provider.tsx

"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  // Inizializza lo stato con il tema predefinito senza accedere a localStorage
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  // Recupera il tema salvato da localStorage al montaggio del componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      if (savedTheme) {
        setThemeState(savedTheme)
      } else if (defaultTheme === "system" && enableSystem) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setThemeState(systemTheme)
      }
    }
  }, [defaultTheme, storageKey, enableSystem])

  // Aggiorna il DOM e salva il tema in localStorage ogni volta che il tema cambia
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement

      if (disableTransitionOnChange) {
        root.classList.add("[&_*]:!transition-none")
        setTimeout(() => root.classList.remove("[&_*]:!transition-none"), 0)
      }

      // Rimuove le classi "light" e "dark"
      root.classList.remove("light", "dark")

      if (theme === "system" && enableSystem) {
        // Determina il tema del sistema e lo applica
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.add(systemTheme)
      } else {
        // Applica il tema selezionato
        root.classList.add(theme)
      }

      // Salva il tema in localStorage se non è "system"
      if (theme !== "system") {
        localStorage.setItem(storageKey, theme)
      } else {
        localStorage.removeItem(storageKey)
      }
    }
  }, [theme, disableTransitionOnChange, enableSystem, storageKey])

  // Funzione per aggiornare il tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const value = {
    theme,
    setTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
