import NotFound from '@/app/not-found'
import { BlurIn } from '@/components/Blur-in'
import { CarouselComponent } from '@/components/CarouselComponent'
import MapaCobertura from '@/components/MapaCobertura'
import { SimpleCard_V1 } from '@/components/SimpleCard_V1'
import { getProductBySlug } from '@/lib/products'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const priceTypeTranslations = {
  fixed: 'Precio fijo',
  hourly: 'Por hora',
  project: 'Por proyecto'
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
      <div className='flex flex-col justify-center mx-auto gap-2 px-2 pt-10 md:px-8 md:pt-20 lg:flex-row'>
        <CarouselComponent images={product.imageUrl} />
        <SimpleCard_V1
          title={product.title ?? 'Sin título'}
          description={product.description ?? 'Sin descripción'}
          city={product.city ?? 'Sin ciudad'}
          price={product.price ?? 0}
          priceType={
            priceTypeTranslations[product.priceType] ?? 'Sin tipo de precio'
          }
          isUrgent={product.isUrgent}
          facebook={product.facebook}
          instagram={product.instagram}
          tags={product.tags}
        />
      </div>
      <div className='px-2 md:px-8'>

      <MapaCobertura initialCity={product.city} />
      </div>
    </div>
  )
}
