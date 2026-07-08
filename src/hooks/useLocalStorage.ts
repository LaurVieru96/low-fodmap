import { useEffect, useState } from 'react'

/** State mirrored to localStorage. Reads once on mount, writes on change. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable (private mode) — non-fatal.
    }
  }, [key, value])

  return [value, setValue] as const
}
