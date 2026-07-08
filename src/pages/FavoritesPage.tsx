import PagePlaceholder from '../components/PagePlaceholder'

export default function FavoritesPage() {
  return (
    <PagePlaceholder
      eyebrow="salvate"
      title="Favorite"
      intro="Alimentele și rețetele pe care le marchezi, la un singur tap, salvate pe acest dispozitiv."
      phase="Faza 5"
      points={[
        'Marchezi orice aliment sau rețetă ca favorit din listă sau din detaliu.',
        'Se păstrează local (localStorage), fără cont și fără internet.',
        'Grupate pe alimente și rețete, ușor de răsfoit.',
      ]}
    />
  )
}
