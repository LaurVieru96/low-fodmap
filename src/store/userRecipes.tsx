import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Recipe } from '../lib/types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { UserRecipesContext } from './userRecipes-context'

export function UserRecipesProvider({ children }: { children: ReactNode }) {
  const [userRecipes, setUserRecipes] = useLocalStorage<Recipe[]>('lf:userRecipes', [])

  const addUserRecipe = useCallback(
    (recipe: Recipe) => {
      setUserRecipes((prev) => [
        { ...recipe, isUserRecipe: true },
        ...prev.filter((r) => r.id !== recipe.id),
      ])
    },
    [setUserRecipes],
  )

  const removeUserRecipe = useCallback(
    (id: string) => setUserRecipes((prev) => prev.filter((r) => r.id !== id)),
    [setUserRecipes],
  )

  const value = useMemo(
    () => ({ userRecipes, addUserRecipe, removeUserRecipe }),
    [userRecipes, addUserRecipe, removeUserRecipe],
  )

  return <UserRecipesContext.Provider value={value}>{children}</UserRecipesContext.Provider>
}
