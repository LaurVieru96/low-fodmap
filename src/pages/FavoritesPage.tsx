import { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { getFoodById } from '../data/foods'
import { getRecipeById } from '../data/recipes'
import type { Food, Recipe } from '../lib/types'
import { useFavorites } from '../store/favorites-context'
import { useUserRecipes } from '../store/userRecipes-context'
import PageHeader from '../components/PageHeader'
import FoodRow from '../components/foods/FoodRow'
import FoodDetailSheet from '../components/foods/FoodDetailSheet'
import RecipeCard from '../components/recipes/RecipeCard'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { userRecipes } = useUserRecipes()
  const [selected, setSelected] = useState<Food | null>(null)

  const favFoods = useMemo(
    () =>
      favorites
        .filter((k) => k.startsWith('food:'))
        .map((k) => getFoodById(k.slice(5)))
        .filter((f): f is Food => Boolean(f)),
    [favorites],
  )

  const favRecipes = useMemo(
    () =>
      favorites
        .filter((k) => k.startsWith('recipe:'))
        .map((k) => {
          const id = k.slice(7)
          return getRecipeById(id) ?? userRecipes.find((r) => r.id === id)
        })
        .filter((r): r is Recipe => Boolean(r)),
    [favorites, userRecipes],
  )

  const empty = favFoods.length === 0 && favRecipes.length === 0

  return (
    <div>
      <PageHeader eyebrow="salvate" title="Favorite">
        Alimentele și rețetele pe care le-ai marcat, salvate pe acest dispozitiv.
      </PageHeader>

      {empty ? (
        <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
          <Heart size={28} className="mx-auto mb-3" aria-hidden="true" />
          Încă n-ai favorite. Apasă inima pe un aliment sau o rețetă.
        </div>
      ) : (
        <div className="space-y-8">
          {favFoods.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg text-ink">Alimente</h2>
              <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {favFoods.map((f) => (
                  <FoodRow key={f.id} food={f} onSelect={setSelected} />
                ))}
              </ul>
            </section>
          )}
          {favRecipes.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg text-ink">Rețete</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favRecipes.map((r) => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      <FoodDetailSheet food={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
