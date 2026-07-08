import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ThemeContext } from './theme-context'
import type { ThemeMode } from './theme-context'

/** Browser-chrome color per theme (mobile address bar), kept in sync with --color-paper. */
const THEME_COLOR = { light: '#faf4ef', dark: '#17131c' } as const

const DARK_QUERY = '(prefers-color-scheme: dark)'

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(DARK_QUERY).matches
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useLocalStorage<ThemeMode>('lf:theme', 'system')
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  // Keep tracking the OS preference so 'system' mode reacts live.
  useEffect(() => {
    const mq = window.matchMedia(DARK_QUERY)
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const resolved: 'light' | 'dark' = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode

  // Apply the resolved theme to <html> (drives the CSS variable overrides) and
  // the browser chrome color. The inline script in index.html does this first
  // to avoid a flash; here we keep it in sync on every change.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[resolved])
  }, [resolved])

  const toggle = useCallback(
    () => setMode(resolved === 'dark' ? 'light' : 'dark'),
    [resolved, setMode],
  )

  const value = useMemo(
    () => ({ mode, resolved, setMode, toggle }),
    [mode, resolved, setMode, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
