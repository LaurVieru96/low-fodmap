import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'

export default function RecipesPage() {
  return (
    <div>
      <PageHeader eyebrow="rețete" title="Rețete">
        Idei de mese sigure, de la rapide și ușoare la mai elaborate — filtrabile după tip, timp și
        dificultate.
      </PageHeader>

      <div className="mb-6">
        <Link to="/reteta-mea" className="btn-primary">
          <PlusCircle size={18} strokeWidth={2} aria-hidden="true" />
          Rețetă nouă
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          În construcție · Faza 3
        </p>
        <ul className="mt-4 space-y-2.5">
          {[
            '37 de rețete verificate: mic dejun, prânz, cină, gustări și baze (sosuri, ulei infuzat).',
            'Filtre combinabile: tip de masă, timp, dificultate și taguri (fără gluten, vegan, o singură tigaie…).',
            'Detaliu cu poză, ingrediente cu semafor, pași și „adaugă tot la cumpărături".',
          ].map((p, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed text-ink-soft">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
