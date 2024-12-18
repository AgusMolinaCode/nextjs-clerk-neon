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


export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza caracteres no alfanuméricos por guiones
    .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio o al final
}