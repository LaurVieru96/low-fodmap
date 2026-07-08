import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { FavoritesContext, type FavKind } from './favorites-context'

const makeKey = (kind: FavKind, id: string) => `${kind}:${id}`

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('lf:favorites', [])

  const isFavorite = useCallback(
    (kind: FavKind, id: string) => favorites.includes(makeKey(kind, id)),
    [favorites],
  )

  const toggleFavorite = useCallback(
    (kind: FavKind, id: string) => {
      const key = makeKey(kind, id)
      setFavorites((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
      )
    },
    [setFavorites],
  )

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
