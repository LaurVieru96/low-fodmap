import { createContext, useContext } from 'react'

/** User's chosen theme. 'system' follows the OS until they pick light/dark. */
export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  /** The stored preference (may be 'system'). */
  mode: ThemeMode
  /** The theme actually applied after resolving 'system'. */
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  /** Flip light↔dark, pinning an explicit mode. */
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
