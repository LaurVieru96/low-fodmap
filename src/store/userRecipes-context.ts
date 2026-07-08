import { createContext, useContext } from 'react'
import type { Recipe } from '../lib/types'

export interface UserRecipesContextValue {
  userRecipes: Recipe[]
  addUserRecipe: (recipe: Recipe) => void
  removeUserRecipe: (id: string) => void
}

export const UserRecipesContext = createContext<UserRecipesContextValue | null>(null)

export function useUserRecipes() {
  const ctx = useContext(UserRecipesContext)
  if (!ctx) throw new Error('useUserRecipes must be used within UserRecipesProvider')
  return ctx
}
