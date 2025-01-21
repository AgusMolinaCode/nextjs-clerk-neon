export const Categories = [
    { id: 1, name: 'Electrónica', icons: '/assets/icons/electronics.svg' },
    { id: 2, name: 'Ropa', icons: '/assets/icons/clothing.svg' },
    { id: 3, name: 'Hogar y Jardín', icons: '/assets/icons/home_garden.svg' },
    { id: 4, name: 'Deportes y Aire Libre', icons: '/assets/icons/sports_outdoors.svg' },
    { id: 5, name: 'Juguetes y Juegos', icons: '/assets/icons/toys_games.svg' },
    { id: 6, name: 'Salud y Belleza', icons: '/assets/icons/health_beauty.svg' },
    { id: 7, name: 'Automotriz', icons: '/assets/icons/automotive.svg' },
    { id: 8, name: 'Joyería', icons: '/assets/icons/jewelry.svg' },
    { id: 9, name: 'Suministros para Mascotas', icons: '/assets/icons/pet_supplies.svg' },
    { id: 10, name: 'Libros y Literatura', icons: '/assets/icons/books_literature.svg' },
]

export const ServiceCategories = [
  {
    label: 'Transporte',
    color: 'bg-blue-100 dark:bg-blue-950',
    items: [
      { value: 'flete', label: 'Fletes y Mudanzas' },
      { value: 'transporte-personal', label: 'Transporte Personal' },
      { value: 'delivery', label: 'Delivery y Mensajería' }
    ]
  },
  {
    label: 'Construcción',
    color: 'bg-orange-100 dark:bg-orange-950',
    items: [
      { value: 'albanil', label: 'Albañil' },
      { value: 'pintor', label: 'Pintor' },
      { value: 'carpintero', label: 'Carpintero' }
    ]
  },
  {
    label: 'Instalaciones',
    color: 'bg-yellow-100 dark:bg-yellow-950',
    items: [
      { value: 'plomero', label: 'Plomero' },
      { value: 'gasista', label: 'Gasista' },
      { value: 'electricista', label: 'Electricista' }
    ]
  },
  {
    label: 'Tecnología',
    color: 'bg-purple-100 dark:bg-purple-950',
    items: [
      { value: 'computacion', label: 'Reparación PC/Notebook' },
      { value: 'redes', label: 'Redes/WiFi' },
      { value: 'programacion', label: 'Programación/Web' }
    ]
  },
  {
    label: 'Hogar',
    color: 'bg-green-100 dark:bg-green-950',
    items: [
      { value: 'limpieza', label: 'Limpieza' },
      { value: 'jardineria', label: 'Jardinería' },
      { value: 'decoracion', label: 'Decoración' }
    ]
  },
  {
    label: 'Profesionales',
    color: 'bg-indigo-100 dark:bg-indigo-950',
    items: [
      { value: 'contador', label: 'Contador' },
      { value: 'abogado', label: 'Abogado' },
      { value: 'arquitecto', label: 'Arquitecto' }
    ]
  },
  {
    label: 'Educación',
    color: 'bg-pink-100 dark:bg-pink-950',
    items: [
      { value: 'profesor', label: 'Profesor Particular' },
      { value: 'idiomas', label: 'Profesor de Idiomas' },
      { value: 'musica', label: 'Profesor de Música' }
    ]
  }
]

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza caracteres no alfanuméricos por guiones
    .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio o al final
}

export const FRAMEWORKS = ServiceCategories.flatMap(category => 
  category.items.map(item => ({
    value: item.value,
    label: item.label,
    group: category.label,
    color: category.color
  }))
);