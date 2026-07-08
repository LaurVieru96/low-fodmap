import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function RecipeDetailPage() {
  const { id } = useParams()
  return (
    <div>
      <Link
        to="/retete"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        Înapoi la rețete
      </Link>
      <h1 className="mt-4 text-3xl text-ink">Detaliu rețetă</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
        Rețeta <span className="font-mono text-ink">{id}</span> — poză, ingrediente cu semafor,
        pași numerotați și „adaugă tot la cumpărături". <span className="text-muted">(Faza 3)</span>
      </p>
    </div>
  )
}
