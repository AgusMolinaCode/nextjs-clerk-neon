import { getProducts } from '@/lib/products'  
import ProductCard from '@/components/ProductCard'
import {HeroSection} from '@/components/HeroSection'

export default async function Home() {
  const products = await getProducts()

  return (
    <section>
      <div>
        <HeroSection />
        <h1 className='text-2xl font-semibold'>Inicio</h1>
        {products.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
            <h2 className='text-xl font-medium text-gray-600 dark:text-gray-400'>No hay publicaciones disponibles</h2>
            <p className='text-gray-500 dark:text-gray-500 mt-2'>Sé el primero en publicar un servicio</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            {products.map((product) => (
              <ProductCard 
                key={String(product.id)} 
                product={{ 
                  ...product, 
                  id: String(product.id), 
                  description: product.description || 'Descripción no disponible',
                  imageUrl: product.imageUrl?.[0] || '/assets/images/no-product.png'
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
