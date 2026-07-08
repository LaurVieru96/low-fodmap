import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Trash2 } from 'lucide-react'
import { foods, foodMatchesQuery } from '../data/foods'
import { slugify } from '../lib/fodmap'
import { STATUS_META } from '../lib/status'
import type { FodmapStatus } from '../lib/status'
import { DIFFICULTY_META, MEAL_META, MEAL_ORDER } from '../lib/recipeMeta'
import type { Difficulty, Ingredient, MealType, Recipe } from '../lib/types'
import { computeVerdict } from '../lib/verdict'
import { useUserRecipes } from '../store/userRecipes-context'
import PageHeader from '../components/PageHeader'

interface BuilderIngredient {
  key: string
  name: string
  emoji: string
  foodId?: string
  status?: FodmapStatus
  serving?: string
  quantity: string
}

const VERDICT_STYLE: Record<
  FodmapStatus | 'unknown',
  { label: string; bg: string; color: string; dot: string }
> = {
  green: {
    label: 'Rețetă permisă',
    bg: 'var(--color-green-soft)',
    color: 'var(--color-green-ink)',
    dot: 'var(--color-green)',
  },
  amber: {
    label: 'Cu limită — atenție la porții',
    bg: 'var(--color-amber-soft)',
    color: 'var(--color-amber-ink)',
    dot: 'var(--color-amber)',
  },
  red: {
    label: 'Conține ingrediente de evitat',
    bg: 'var(--color-red-soft)',
    color: 'var(--color-red-ink)',
    dot: 'var(--color-red)',
  },
  unknown: {
    label: 'Verdict neclar — verifică ingredientele libere',
    bg: 'var(--color-sunk)',
    color: 'var(--color-ink-soft)',
    dot: 'var(--color-muted)',
  },
}

const inputClass =
  'w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none'

export default function MyRecipePage() {
  const navigate = useNavigate()
  const { addUserRecipe } = useUserRecipes()
  const keyRef = useRef(0)
  const mk = () => `ing-${(keyRef.current += 1)}`

  const [title, setTitle] = useState('')
  const [mealType, setMealType] = useState<MealType>('lunch')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [servings, setServings] = useState('2')
  const [timeMin, setTimeMin] = useState('')
  const [steps, setSteps] = useState('')
  const [ingredients, setIngredients] = useState<BuilderIngredient[]>([])
  const [query, setQuery] = useState('')

  const matches = useMemo(
    () => (query.trim() ? foods.filter((f) => foodMatchesQuery(f, query)).slice(0, 8) : []),
    [query],
  )

  const verdict = useMemo(
    () =>
      computeVerdict(
        ingredients.map((i) => ({ name: i.name, foodId: i.foodId, status: i.status })),
      ),
    [ingredients],
  )

  const canSave = title.trim().length > 0 && ingredients.length > 0

  function addFood(food: (typeof foods)[number]) {
    setIngredients((prev) => [
      ...prev,
      {
        key: mk(),
        name: food.nameRo,
        emoji: food.emoji,
        foodId: food.id,
        status: food.status,
        serving: food.serving,
        quantity: '',
      },
    ])
    setQuery('')
  }

  function addFreeText() {
    const name = query.trim()
    if (!name) return
    setIngredients((prev) => [...prev, { key: mk(), name, emoji: '❓', quantity: '' }])
    setQuery('')
  }

  function setQuantity(key: string, value: string) {
    setIngredients((prev) => prev.map((i) => (i.key === key ? { ...i, quantity: value } : i)))
  }

  function removeIngredient(key: string) {
    setIngredients((prev) => prev.filter((i) => i.key !== key))
  }

  function save() {
    if (!canSave) return
    const finalIngredients: Ingredient[] = ingredients.map((ing) => ({
      name: ing.quantity.trim() ? `${ing.quantity.trim()} ${ing.name}` : ing.name,
      foodId: ing.foodId,
      status: ing.status,
    }))
    const recipe: Recipe = {
      id: `${slugify(title)}-${Date.now().toString(36)}`,
      title: title.trim(),
      mealType,
      totalTimeMin: Number(timeMin) || 0,
      difficulty,
      servings: Number(servings) || 1,
      ingredients: finalIngredients,
      steps: steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      tags: [],
      isUserRecipe: true,
      fodmapVerdict: verdict.status,
    }
    addUserRecipe(recipe)
    navigate(`/retete/${recipe.id}`)
  }

  const v = VERDICT_STYLE[verdict.status]

  return (
    <div className="max-w-2xl">
      <PageHeader eyebrow="constructor" title="Rețeta mea">
        Compune-ți propria rețetă. Fiecare ingredient ales din baza de alimente e verificat automat,
        iar rețeta primește un verdict FODMAP.
      </PageHeader>

      {/* Meta */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink">
            Nume rețetă
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex. Salata mea de prânz"
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="meal" className="mb-1 block text-sm font-medium text-ink">
              Tip de masă
            </label>
            <select
              id="meal"
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
              className={inputClass}
            >
              {MEAL_ORDER.map((m) => (
                <option key={m} value={m}>
                  {MEAL_META[m].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="mb-1 block text-sm font-medium text-ink">
              Dificultate
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className={inputClass}
            >
              {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_META[d].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="servings" className="mb-1 block text-sm font-medium text-ink">
              Porții
            </label>
            <input
              id="servings"
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="time" className="mb-1 block text-sm font-medium text-ink">
              Timp (min)
            </label>
            <input
              id="time"
              type="number"
              min="0"
              value={timeMin}
              onChange={(e) => setTimeMin(e.target.value)}
              placeholder="opțional"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Ingredient search */}
      <div className="mt-8">
        <h2 className="text-lg text-ink">Ingrediente</h2>
        <div className="relative mt-3">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută un aliment ca să-l adaugi…"
            aria-label="Caută un aliment"
            className={`${inputClass} pl-10`}
          />
          {query.trim() && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
              {matches.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => addFood(f)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-sunk"
                >
                  <span className="text-xl" aria-hidden="true">
                    {f.emoji}
                  </span>
                  <span className="flex-1 text-ink">{f.nameRo}</span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: STATUS_META[f.status].color }}
                    aria-hidden="true"
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={addFreeText}
                className="flex w-full items-center gap-2 border-t border-line px-3 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-sunk"
              >
                <Plus size={16} strokeWidth={2} aria-hidden="true" />
                Adaugă „{query.trim()}" ca text liber
              </button>
            </div>
          )}
        </div>

        {/* Ingredient list */}
        {ingredients.length > 0 && (
          <ul className="mt-4 space-y-2">
            {ingredients.map((ing) => (
              <li
                key={ing.key}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    background: ing.status
                      ? STATUS_META[ing.status].color
                      : 'var(--color-muted)',
                  }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-ink">
                    {ing.emoji} {ing.name}
                  </span>
                  {ing.serving ? (
                    <span className="block text-xs text-muted">porție sigură: {ing.serving}</span>
                  ) : (
                    !ing.foodId && (
                      <span className="block text-xs text-muted">necunoscut — verifică singur</span>
                    )
                  )}
                </span>
                <input
                  value={ing.quantity}
                  onChange={(e) => setQuantity(ing.key, e.target.value)}
                  placeholder="cât?"
                  aria-label={`Cantitate ${ing.name}`}
                  className="w-24 rounded-lg border border-line bg-paper px-2 py-1.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(ing.key)}
                  aria-label={`Șterge ${ing.name}`}
                  className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-sunk hover:text-red"
                >
                  <Trash2 size={16} strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Verdict */}
      {ingredients.length > 0 && (
        <div className="mt-6 rounded-2xl p-4" style={{ background: v.bg }}>
          <div className="flex items-center gap-2" style={{ color: v.color }}>
            <span className="h-3 w-3 rounded-full" style={{ background: v.dot }} aria-hidden="true" />
            <span className="font-semibold">{v.label}</span>
          </div>
          {verdict.stacking && (
            <p className="mt-2 text-sm" style={{ color: v.color }}>
              Mai multe ingrediente cu limită — atenție la efectul cumulativ (stacking). Distanțează
              mesele la 2–3 ore.
            </p>
          )}
          {verdict.unknown > 0 && (
            <p className="mt-2 text-sm" style={{ color: v.color }}>
              {verdict.unknown}{' '}
              {verdict.unknown === 1 ? 'ingredient liber' : 'ingrediente libere'} necontrolate —
              verifică-le în ghidul de alimente.
            </p>
          )}
        </div>
      )}

      {/* Steps */}
      <div className="mt-8">
        <label htmlFor="steps" className="mb-1 block text-lg text-ink">
          Preparare <span className="text-sm font-normal text-muted">(opțional)</span>
        </label>
        <textarea
          id="steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows={5}
          placeholder="Câte un pas pe linie…"
          className={inputClass}
        />
      </div>

      <button
        type="button"
        onClick={save}
        disabled={!canSave}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        Salvează rețeta
      </button>
      {!canSave && (
        <p className="mt-2 text-center text-xs text-muted">
          Adaugă un nume și cel puțin un ingredient.
        </p>
      )}
    </div>
  )
}
