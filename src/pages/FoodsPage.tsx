import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { foods, foodMatchesQuery } from '../data/foods'
import { CATEGORY_META, CATEGORY_ORDER, GROUP_META } from '../lib/fodmap'
import type { Food, FodmapGroup, FoodCategory } from '../lib/types'
import type { FodmapStatus } from '../lib/status'
import PageHeader from '../components/PageHeader'
import FoodRow from '../components/foods/FoodRow'
import FoodDetailSheet from '../components/foods/FoodDetailSheet'

const STATUS_FILTERS: { value: 'all' | FodmapStatus; label: string }[] = [
  { value: 'all', label: 'Toate' },
  { value: 'green', label: '🟢 Permise' },
  { value: 'amber', label: '🟡 Cu limită' },
  { value: 'red', label: '🔴 De evitat' },
]

const GROUP_KEYS = Object.keys(GROUP_META) as FodmapGroup[]

export default function FoodsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | FodmapStatus>('all')
  const [category, setCategory] = useState<'all' | FoodCategory>('all')
  const [group, setGroup] = useState<'all' | FodmapGroup>('all')
  const [selected, setSelected] = useState<Food | null>(null)

  const filtered = useMemo(
    () =>
      foods.filter(
        (f) =>
          foodMatchesQuery(f, query) &&
          (status === 'all' || f.status === status) &&
          (category === 'all' || f.category === category) &&
          (group === 'all' || f.groups.includes(group)),
      ),
    [query, status, category, group],
  )

  const grouped = useMemo(() => {
    const map = new Map<FoodCategory, Food[]>()
    for (const f of filtered) {
      const arr = map.get(f.category) ?? []
      arr.push(f)
      map.set(f.category, arr)
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      category: c,
      items: map.get(c) ?? [],
    }))
  }, [filtered])

  return (
    <div>
      <PageHeader eyebrow="ghid alimente" title="Alimente">
        Caută orice aliment și vezi dacă e permis și în ce cantitate. Apasă pentru detalii — porție,
        subgrupă FODMAP și note.
      </PageHeader>

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
          placeholder="Caută un aliment…"
          aria-label="Caută un aliment"
          className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStatus(s.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              status === s.value
                ? 'bg-ink text-white'
                : 'border border-line bg-surface text-ink-soft hover:bg-sunk'
            }`}
          >
            {s.label}
          </button>
        ))}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'all' | FoodCategory)}
          aria-label="Filtrează după categorie"
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft focus:border-accent focus:outline-none"
        >
          <option value="all">Toate categoriile</option>
          {CATEGORY_ORDER.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c].label}
            </option>
          ))}
        </select>

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value as 'all' | FodmapGroup)}
          aria-label="Filtrează după subgrupă FODMAP"
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft focus:border-accent focus:outline-none"
        >
          <option value="all">Toate subgrupele</option>
          {GROUP_KEYS.map((g) => (
            <option key={g} value={g}>
              {GROUP_META[g].short}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? 'aliment' : 'alimente'}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          Niciun aliment nu se potrivește filtrelor.
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ category: c, items }) => (
            <section key={c}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                <span aria-hidden="true">{CATEGORY_META[c].emoji}</span>
                {CATEGORY_META[c].label}
                <span className="font-normal">· {items.length}</span>
              </h2>
              <ul className="space-y-2">
                {items.map((f) => (
                  <FoodRow key={f.id} food={f} onSelect={setSelected} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <FoodDetailSheet food={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
