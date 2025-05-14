"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Create a context for user settings
type UserSettingsContextType = {
  preferredMostUsed: string
  setPreferredMostUsed: (section: string) => void
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined)

export function UserSettingsProvider({ children }: { children: React.ReactNode }) {
  const [preferredMostUsed, setPreferredMostUsedState] = useState<string>("auto")

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("gdayo-most-used-preference")
    if (savedPreference) {
      setPreferredMostUsedState(savedPreference)
    }
  }, [])

  // Save settings to localStorage when changed
  const setPreferredMostUsed = (section: string) => {
    setPreferredMostUsedState(section)
    localStorage.setItem("gdayo-most-used-preference", section)
  }

  return (
    <UserSettingsContext.Provider value={{ preferredMostUsed, setPreferredMostUsed }}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings() {
  const context = useContext(UserSettingsContext)
  if (context === undefined) {
    throw new Error("useUserSettings must be used within a UserSettingsProvider")
  }
  return context
}
