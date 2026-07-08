import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Eroare 404</p>
      <h1 className="mt-3 text-4xl text-ink">Pagina nu există</h1>
      <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
        Poate a fost mutată sau linkul e greșit.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Înapoi la ghid
      </Link>
    </div>
  )
}
