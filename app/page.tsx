'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { HeroSection } from '@/components/HeroSection'
import SelectWithSearch from '@/components/SelectWithSearch'
import { Separator } from '@/components/Separator'
import SelectNativeComponent from '@/components/SelectNativeComponent'
import { Product } from '@prisma/client'
import { ServiceCategories } from '@/constants'
import { Button } from '@/components/ui/button'
import PaginationComponent from '@/components/PaginationComponent'
import { Loader2 } from 'lucide-react'
import { SearchIcon } from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [categories, setCategories] = useState<
    Array<{ value: string; label: string }>
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async (page: number = 1) => {
    setIsLoading(true)
    try {
      const response = await getProducts(selectedCity || undefined, page)
      const productsWithDates = response.products
        .map(product => ({
          ...product,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt)
        }))
        .filter(
          product =>
            (!selectedCategory || product.category === selectedCategory) &&
            (!selectedCity || product.city?.includes(selectedCity))
        )

      setProducts(productsWithDates)
      setTotalPages(response.totalPages)
      setCurrentPage(response.currentPage)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        const allProducts = await getProducts()
        const uniqueCities = [
          ...new Set(
            allProducts.products
              .map(product => product.city?.split(',')[1].trim())
              .filter((city): city is string => city !== null)
          )
        ]
        setCities(uniqueCities)

        const uniqueCategories = [
          ...new Set(allProducts.products.map(product => product.category))
        ]
        const categoriesWithLabels = uniqueCategories.map(category => {
          const categoryInfo = ServiceCategories.flatMap(
            group => group.items
          ).find(item => item.value === category)
          return {
            value: category,
            label: categoryInfo?.label || category
          }
        })
        setCategories(categoriesWithLabels)

        await fetchProducts()
      } catch (error) {
        console.error('Error fetching initial data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = () => {
    setCurrentPage(1)
    fetchProducts(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchProducts(page)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section>
      <div>
        <HeroSection />
        <div className='mx-auto flex flex-col justify-center gap-4 px-2 pt-6 md:flex-row md:pt-8'>
          <SelectWithSearch
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
          <SelectNativeComponent
            cities={cities}
            onCityChange={handleCityChange}
          />
          <Button
            onClick={handleSearch}
            onKeyPress={handleKeyPress}
            className='bg-primary hover:bg-primary/90'
          >
            <SearchIcon className='mr-2 h-4 w-4' />
            Buscar
          </Button>
        </div>
        {isLoading ? (
          <div className='flex min-h-[455px] flex-col items-center justify-center text-center'>
            <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
            <p className='mt-2 text-sm text-gray-500'>Cargando servicios...</p>
          </div>
        ) : products.length === 0 ? (
          <div className='flex min-h-[455px] flex-col items-center justify-center text-center'>
            <h2 className='text-xl font-medium text-gray-600 dark:text-gray-400'>
              {selectedCity || selectedCategory
                ? `No hay publicaciones disponibles${selectedCity ? ` en ${selectedCity}` : ''}${selectedCategory ? ` para la categoría seleccionada` : ''}`
                : 'No hay publicaciones disponibles'}
            </h2>
            <p className='mt-2 text-gray-500 dark:text-gray-500'>
              Sé el primero en publicar un servicio
            </p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 gap-4 px-4 pt-10 md:grid-cols-2 md:px-8 md:pt-20 lg:grid-cols-3 lg:px-16 xl:grid-cols-4 2xl:px-32'>
              {products.map(product => (
                <ProductCard
                  key={String(product.id)}
                  product={{
                    ...product,
                    id: String(product.id),
                    description:
                      product.description || 'Descripción no disponible',
                    imageUrl:
                      product.imageUrl?.[0] || '/assets/images/no-product.png',
                    slug: product.slug
                  }}
                />
              ))}
            </div>

            <div className='mt-8 flex justify-start px-4 pb-8 md:px-8 lg:px-16 2xl:px-32'>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
