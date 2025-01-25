import NotFound from '@/app/not-found'
import { BlurIn } from '@/components/Blur-in'
import { CarouselComponent } from '@/components/CarouselComponent'
import MapaCobertura from '@/components/MapaCobertura'
import { SimpleCard_V1 } from '@/components/SimpleCard_V1'
import { getProductBySlug, getRating } from '@/lib/products'
import { currentUser, User } from '@clerk/nextjs/server'
import { Product, Rating } from '@/lib/utils'
import RatingComponent from '@/components/RatingComponent'

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
  const user = await currentUser()
  if (!user) {
    return <NotFound />
  }

  const phone = user?.phoneNumbers[0]?.phoneNumber
  const nameLastname = user?.fullName
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const product = (await getProductBySlug(resolvedParams.slug)) as Product & {
    ratings: Rating[]
  }
  const ratings = await getRating(product.id)

  // Calcular el promedio de calificaciones y redondear hacia arriba
  const averageRating =
    ratings.length > 0
      ? Math.ceil(
          ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
        )
      : 0

  // Generar una cadena de estrellas basada en el promedio redondeado
  const stars = '⭐'.repeat(averageRating)

  if (!product) {
    return <NotFound />
  }

  return (
    <div className='min-h-screen'>
      <BlurIn>{nameLastname}</BlurIn>
      <h2 className='text-center text-2xl font-bold'>{product.title}</h2>
      <p className='pt-4 text-center text-sm text-zinc-500'>
        {ratings.length} calificaciones • {stars}
      </p>
      <div className='mx-auto flex flex-col justify-center gap-2 px-2 pt-6 md:px-8 md:pt-10 lg:flex-row'>
        <CarouselComponent images={product.imageUrl || []} />
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
          phone={phone ?? ''}
        />
      </div>
      <div className='px-2 md:px-8'>
        <MapaCobertura initialCity={product.city} />
        <div className='flex flex-col justify-center gap-2 px-2 pt-6 md:px-8 md:pt-10 lg:flex-row'>
          {ratings.map((rating) => (
            <div key={rating.id}>
              <p>{rating.rating}</p>
              <p>{rating.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='px-2 md:px-8'>
        <RatingComponent product={product} userId={product.userId} />
      </div>
    </div>
  )
}
