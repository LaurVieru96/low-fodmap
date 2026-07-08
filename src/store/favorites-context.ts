import { createContext, useContext } from 'react'

export type FavKind = 'food' | 'recipe'

export interface FavoritesContextValue {
  favorites: string[]
  isFavorite: (kind: FavKind, id: string) => boolean
  toggleFavorite: (kind: FavKind, id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
