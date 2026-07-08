import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { FoodCategory } from '../lib/types'
import { normalize } from '../lib/fodmap'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ShoppingContext, type ShoppingItem } from './shopping-context'

const makeId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('lf:shopping', [])

  const addItem = useCallback(
    (name: string, category?: FoodCategory) => {
      const trimmed = name.trim()
      if (!trimmed) return
      setItems((prev) =>
        prev.some((i) => normalize(i.name) === normalize(trimmed))
          ? prev
          : [...prev, { id: makeId(), name: trimmed, checked: false, category }],
      )
    },
    [setItems],
  )

  const addMany = useCallback(
    (entries: { name: string; category?: FoodCategory }[]) => {
      const existing = new Set(items.map((i) => normalize(i.name)))
      const toAdd: ShoppingItem[] = []
      for (const e of entries) {
        const trimmed = e.name.trim()
        const key = normalize(trimmed)
        if (!trimmed || existing.has(key)) continue
        existing.add(key)
        toAdd.push({ id: makeId(), name: trimmed, checked: false, category: e.category })
      }
      if (toAdd.length > 0) setItems((prev) => [...prev, ...toAdd])
      return toAdd.length
    },
    [items, setItems],
  )

  const toggleItem = useCallback(
    (id: string) =>
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i))),
    [setItems],
  )

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    [setItems],
  )

  const clearChecked = useCallback(
    () => setItems((prev) => prev.filter((i) => !i.checked)),
    [setItems],
  )

  const clearAll = useCallback(() => setItems([]), [setItems])

  const value = useMemo(
    () => ({ items, addItem, addMany, toggleItem, removeItem, clearChecked, clearAll }),
    [items, addItem, addMany, toggleItem, removeItem, clearChecked, clearAll],
  )

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>
}
