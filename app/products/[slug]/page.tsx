import NotFound from '@/app/not-found'
import { BlurIn } from '@/components/Blur-in'
import { CarouselComponent } from '@/components/CarouselComponent'
import { SimpleCard_V1 } from '@/components/SimpleCard_V1'
import { getProductBySlug } from '@/lib/products'
import Image from 'next/image'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const product = await getProductBySlug(resolvedParams.slug)
  console.log(product)

  if (!product) {
    return <NotFound />
  }

  return (
    <div className='min-h-screen'>
      <BlurIn>{product.title}</BlurIn>
      <div className='flex flex-col lg:flex-row gap-4 px-2 md:px-8 pt-10 md:pt-20'>
        <CarouselComponent images={product.imageUrl} />
        <SimpleCard_V1 
          // title={product.title ?? 'Sin título'} 
          description={product.description ?? 'Sin descripción'} 
          city={product.city ?? 'Sin ciudad'}
        />
      </div>
    </div>
  )
}
