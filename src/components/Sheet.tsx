import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

/** Bottom sheet on mobile, centered modal on desktop. Closes on Escape or backdrop. */
export default function Sheet({ open, onClose, title, children }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Închide"
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85svh] w-full overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 shadow-xl sm:max-w-md sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted transition-colors hover:bg-sunk"
        >
          <X size={20} strokeWidth={2} />
        </button>
        {children}
      </div>
    </div>
  )
}
