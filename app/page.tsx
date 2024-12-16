import { getProducts } from '@/lib/products'  
import ProductCard from '@/components/ProductCard'

export default async function Home() {
  const products = await getProducts(2)

  return (
    <section className='pb-24 pt-40'>
      <div className='container'>
        <h1 className='text-2xl font-semibold'>Inicio</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((product) => (
            <ProductCard 
              key={String(product.id)} 
              product={{ 
                ...product, 
                id: String(product.id), 
                description: product.description || 'Descripción no disponible',
                imageUrl: product.imageUrl || 'ruta/a/imagen/predeterminada.jpg'
              }} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
