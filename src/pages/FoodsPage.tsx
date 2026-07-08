import PagePlaceholder from '../components/PagePlaceholder'

export default function FoodsPage() {
  return (
    <PagePlaceholder
      eyebrow="ghid alimente"
      title="Alimente"
      intro="Caută orice aliment și vezi imediat dacă e permis și în ce cantitate, cu grupa FODMAP responsabilă."
      phase="Faza 2"
      points={[
        'Listă filtrabilă cu semafor: căutare fără diacritice, filtre pe categorie, status și subgrupă FODMAP.',
        'Comutator „doar cele verzi" pentru vederea rapidă la cumpărături.',
        'Detaliu pe fiecare aliment: cadranul de porție, subgrupele responsabile și o notă scurtă.',
        'Peste 250 de alimente, inclusiv românești (mămăligă, telemea, murături).',
      ]}
    />
  )
}
