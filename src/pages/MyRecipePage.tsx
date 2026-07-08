import PagePlaceholder from '../components/PagePlaceholder'

export default function MyRecipePage() {
  return (
    <PagePlaceholder
      eyebrow="constructor"
      title="Rețeta mea"
      intro="Îți compui propria rețetă, iar fiecare ingredient e verificat automat contra bazei de alimente."
      phase="Faza 4"
      points={[
        'Adaugi ingrediente căutând în baza de alimente, cu cantitate (g / bucăți / linguri).',
        'Validare live: fiecare ingredient primește semaforul aferent porției, plus un verdict global.',
        'Avertizare de „stacking" când mai multe porții galbene se adună în aceeași masă.',
        'Salvare locală (fără cont) — rețeta apare lângă cele existente, cu insigna „rețeta mea".',
      ]}
    />
  )
}
