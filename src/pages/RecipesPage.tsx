import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Search } from 'lucide-react'
import { recipes as seedRecipes, recipeMatchesQuery } from '../data/recipes'
import { DIFFICULTY_META, MEAL_META, MEAL_ORDER, TIME_BUCKETS } from '../lib/recipeMeta'
import type { Difficulty, MealType } from '../lib/types'
import { useUserRecipes } from '../store/userRecipes-context'
import PageHeader from '../components/PageHeader'
import RecipeCard from '../components/recipes/RecipeCard'

export default function RecipesPage() {
  const { userRecipes } = useUserRecipes()
  const [query, setQuery] = useState('')
  const [meal, setMeal] = useState<'all' | MealType>('all')
  const [maxTime, setMaxTime] = useState<'all' | number>('all')
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all')

  const all = useMemo(() => [...userRecipes, ...seedRecipes], [userRecipes])

  const filtered = useMemo(
    () =>
      all.filter(
        (r) =>
          recipeMatchesQuery(r, query) &&
          (meal === 'all' || r.mealType === meal) &&
          (maxTime === 'all' || r.totalTimeMin <= maxTime) &&
          (difficulty === 'all' || r.difficulty === difficulty),
      ),
    [all, query, meal, maxTime, difficulty],
  )

  return (
    <div>
      <PageHeader eyebrow="rețete" title="Rețete">
        Idei de mese sigure, de la rapide și ușoare la mai elaborate — filtrează după tip, timp și
        dificultate.
      </PageHeader>

      <div className="mb-5">
        <Link to="/reteta-mea" className="btn-primary">
          <PlusCircle size={18} strokeWidth={2} aria-hidden="true" />
          Rețetă nouă
        </Link>
      </div>

      <div className="relative mb-4">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută o rețetă sau un ingredient…"
          aria-label="Caută o rețetă"
          className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMeal('all')}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            meal === 'all'
              ? 'bg-ink text-white'
              : 'border border-line bg-surface text-ink-soft hover:bg-sunk'
          }`}
        >
          Toate
        </button>
        {MEAL_ORDER.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMeal(m)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              meal === m
                ? 'bg-ink text-white'
                : 'border border-line bg-surface text-ink-soft hover:bg-sunk'
            }`}
          >
            {MEAL_META[m].emoji} {MEAL_META[m].label}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <select
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          aria-label="Filtrează după timp"
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft focus:border-accent focus:outline-none"
        >
          <option value="all">Orice durată</option>
          {TIME_BUCKETS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'all' | Difficulty)}
          aria-label="Filtrează după dificultate"
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft focus:border-accent focus:outline-none"
        >
          <option value="all">Orice dificultate</option>
          {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_META[d].label}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? 'rețetă' : 'rețete'}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Nicio rețetă nu se potrivește filtrelor.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </ul>
      )}
    </div>
  )
}
