import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { CATEGORY_META, CATEGORY_ORDER } from '../lib/fodmap'
import type { FoodCategory } from '../lib/types'
import { useShopping } from '../store/shopping-context'
import type { ShoppingItem } from '../store/shopping-context'
import PageHeader from '../components/PageHeader'

type GroupKey = FoodCategory | 'other'

export default function ShoppingPage() {
  const { items, addItem, toggleItem, removeItem, clearChecked, clearAll } = useShopping()
  const [input, setInput] = useState('')

  const grouped = useMemo(() => {
    const map = new Map<GroupKey, ShoppingItem[]>()
    for (const it of items) {
      const key: GroupKey = it.category ?? 'other'
      const arr = map.get(key) ?? []
      arr.push(it)
      map.set(key, arr)
    }
    const order: GroupKey[] = [...CATEGORY_ORDER, 'other']
    return order
      .filter((k) => map.has(k))
      .map((k) => ({
        key: k,
        label: k === 'other' ? 'Altele' : CATEGORY_META[k].label,
        emoji: k === 'other' ? '🛒' : CATEGORY_META[k].emoji,
        items: map.get(k) ?? [],
      }))
  }, [items])

  function submit(e: FormEvent) {
    e.preventDefault()
    addItem(input)
    setInput('')
  }

  const checkedCount = items.filter((i) => i.checked).length

  return (
    <div className="max-w-2xl">
      <PageHeader eyebrow="cumpărături" title="Listă de cumpărături">
        Adaugă alimente sau ingrediente și bifează-le în magazin. Se salvează pe acest dispozitiv.
      </PageHeader>

      <form onSubmit={submit} className="mb-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Adaugă un produs…"
          aria-label="Adaugă un produs"
          className="flex-1 rounded-xl border border-line bg-surface px-3 py-2.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <button type="submit" className="btn-primary" aria-label="Adaugă">
          <Plus size={18} strokeWidth={2} />
        </button>
      </form>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
          Lista e goală. Adaugă produse aici sau folosește „Adaugă la cumpărături" dintr-o rețetă.
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {grouped.map((g) => (
              <section key={g.key}>
                <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                  <span aria-hidden="true">{g.emoji}</span>
                  {g.label}
                </h2>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        checked={it.checked}
                        onChange={() => toggleItem(it.id)}
                        aria-label={it.name}
                        className="h-4 w-4"
                        style={{ accentColor: 'var(--color-accent)' }}
                      />
                      <span
                        className={`flex-1 ${it.checked ? 'text-muted line-through' : 'text-ink'}`}
                      >
                        {it.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        aria-label={`Șterge ${it.name}`}
                        className="rounded-lg p-1.5 text-muted transition-colors hover:bg-sunk hover:text-red"
                      >
                        <X size={16} strokeWidth={2} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {checkedCount > 0 && (
              <button type="button" onClick={clearChecked} className="btn-ghost">
                Șterge bifate ({checkedCount})
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="text-sm text-muted transition-colors hover:text-red"
            >
              Golește lista
            </button>
          </div>
        </>
      )}
    </div>
  )
}
