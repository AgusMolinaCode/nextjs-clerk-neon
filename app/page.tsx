'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { HeroSection } from '@/components/HeroSection'
import SelectWithSearch from '@/components/SelectWithSearch'
import { Separator } from '@/components/Separator'
import SelectNativeComponent from '@/components/SelectNativeComponent'
import { Product } from '@prisma/client'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCity, setSelectedCity] = useState('')
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    const fetchInitialData = async () => {
      const allProducts = await getProducts()
      // Extraer solo el nombre de la ciudad (antes de la primera coma)
      const uniqueCities = [...new Set(
        allProducts
          .map(product => product.city?.split(',')[0].trim())
          .filter((city): city is string => city !== null)
      )]
      setCities(uniqueCities)
      
      const productsWithDates = allProducts.map(product => ({
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt)
      }))
      setProducts(productsWithDates)
    }
    fetchInitialData()
  }, [])

  const handleCityChange = async (city: string) => {
    const filteredProducts = await getProducts(city ? city : undefined)
    const productsWithDates = filteredProducts.map(product => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt)
    }))
    setProducts(productsWithDates)
    setSelectedCity(city)
  }

  return (
    <section>
      <div>
        <HeroSection />
        <Separator
          label={
            <span className='px-4'>
              <h2 className='relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text px-3 py-2 text-center font-sans text-3xl text-[0.8rem] font-bold tracking-tight text-transparent dark:from-neutral-600 dark:to-white'>
                Profesionales
              </h2>
            </span>
          }
          gradient
        />

        <div className='pt-0 md:pt-10'>
          <h2 className='relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans font-bold tracking-tight text-transparent dark:from-neutral-600 dark:to-white sm:text-2xl md:text-3xl lg:text-4xl'>
            Conecta con expertos en diversos servicios
          </h2>
        </div>
        <div className='mx-auto gap-4 flex justify-center pt-6 md:pt-8'>
          <SelectWithSearch />
          <SelectNativeComponent 
            cities={cities} 
            onCityChange={handleCityChange} 
          />
        </div>
        {products.length === 0 ? (
          <div className='flex min-h-[400px] flex-col items-center justify-center text-center'>
            <h2 className='text-xl font-medium text-gray-600 dark:text-gray-400'>
              {selectedCity 
                ? `No hay publicaciones en ${selectedCity}` 
                : 'No hay publicaciones disponibles'}
            </h2>
            <p className='mt-2 text-gray-500 dark:text-gray-500'>
              Sé el primero en publicar un servicio
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4 pt-10 md:grid-cols-2 md:pt-20 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map(product => (
              <ProductCard
                key={String(product.id)}
                product={{
                  ...product,
                  id: String(product.id),
                  description:
                    product.description || 'Descripción no disponible',
                  imageUrl:
                    product.imageUrl?.[0] || '/assets/images/no-product.png'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
