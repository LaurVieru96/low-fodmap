import { createContext, useContext } from 'react'
import type { FoodCategory } from '../lib/types'

export interface ShoppingItem {
  id: string
  name: string
  checked: boolean
  category?: FoodCategory
}

export interface ShoppingContextValue {
  items: ShoppingItem[]
  addItem: (name: string, category?: FoodCategory) => void
  /** Adds several entries, skipping names already on the list. Returns how many were added. */
  addMany: (entries: { name: string; category?: FoodCategory }[]) => number
  toggleItem: (id: string) => void
  removeItem: (id: string) => void
  clearChecked: () => void
  clearAll: () => void
}

export const ShoppingContext = createContext<ShoppingContextValue | null>(null)

export function useShopping() {
  const ctx = useContext(ShoppingContext)
  if (!ctx) throw new Error('useShopping must be used within ShoppingProvider')
  return ctx
}
