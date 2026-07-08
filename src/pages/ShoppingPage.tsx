import PagePlaceholder from '../components/PagePlaceholder'

export default function ShoppingPage() {
  return (
    <PagePlaceholder
      eyebrow="cumpărături"
      title="Listă de cumpărături"
      intro="Adaugi ingredientele unei rețete sau alimente individuale și le bifezi în magazin."
      phase="Faza 5"
      points={[
        'Generezi lista dintr-o rețetă cu un singur buton, sau adaugi manual.',
        'Grupată pe categorii, cu bifare pe măsură ce cumperi.',
        'Persistentă între sesiuni (localStorage).',
      ]}
    />
  )
}
