import NotFound from '@/app/not-found'
import { BlurIn } from '@/components/Blur-in'
import { CarouselComponent } from '@/components/CarouselComponent'
import MapaCobertura from '@/components/MapaCobertura'
import { SimpleCard_V1 } from '@/components/SimpleCard_V1'
import { getProductBySlug, getRating } from '@/lib/products'
import { currentUser } from '@clerk/nextjs/server'
import RatingComponent from '@/components/RatingComponent'
import Image from 'next/image'
import { EyeCatchingButton_v1 } from '@/components/EyeCatchingButton_v1'
import Link from 'next/link'

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

// Función para generar las estrellas basadas en el rating
const generateStars = (rating: number) => {
  return '⭐'.repeat(rating)
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const user = await currentUser()

  const resolvedParams = await params

  const product = await getProductBySlug(resolvedParams.slug)

  const ratings = await getRating(product.id)

  // Verificar si el usuario actual ya ha calificado el producto
  const hasUserRated = ratings.some(
    rating => rating.user.clerkUserId === user?.id
  )

  const phone = product.user.whatsapp
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
      <BlurIn>
        {product.user.firstName} {product.user.lastName}
      </BlurIn>
      <h2 className='text-center text-2xl font-bold'>{product.title}</h2>
      <p className='pt-4 text-center text-sm text-zinc-500'>
        {ratings.length} calificaciones • {stars}
      </p>
      <div className='mx-auto w-[135px] pt-5'>
        <EyeCatchingButton_v1>
          <Link
            href={`https://api.whatsapp.com/send/?phone=${phone}&text=Hola%2C+quiero+saber+m%C3%A1s+sobre+este+servicio&type=phone_number&app_absent=0`}
            className='flex items-center gap-1'
            target='_blank'
          >
            Pedir cotización
          </Link>
        </EyeCatchingButton_v1>
      </div>
      <div className='mx-auto flex max-w-5xl flex-col justify-center gap-2 px-2 pt-6 md:px-0 md:pt-10 lg:flex-row'>
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
        <div className='mx-auto max-w-md pt-10'>
          <div className='flex items-center gap-4 py-4'>
            <div className='flex flex-col items-center'>
              <p className='text-4xl font-bold'>{averageRating}/5</p>
              <p className='text-yellow-500'>{stars}</p>
              <p className='text-sm text-zinc-500'>
                {ratings.length} Opiniones
              </p>
            </div>
            <div className='flex-1'>
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratings.filter(r => r.rating === star).length
                const percentage = (count / ratings.length) * 100 || 0
                return (
                  <div key={star} className='flex items-center gap-2'>
                    <span className='text-sm'>{star}</span>
                    <div className='h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700'>
                      <div
                        className='h-2 rounded-full bg-yellow-400'
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className='text-sm text-zinc-500'>
                      {count} Opiniones
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-4 px-2 pt-6 md:grid-cols-2 md:px-8 md:pt-10 lg:flex-row xl:grid-cols-3'>
          {ratings.map(rating => (
            <div key={rating.id} className='max-w-sm'>
              <div className='flex items-center gap-2'>
                <Image
                  src={rating.user.imageUrl || '/assets/images/no-product.png'}
                  alt={rating.user.firstName || 'User avatar'}
                  width={50}
                  height={50}
                  className='rounded-full'
                />
                <div>
                  <p className='text-lg font-semibold'>
                    {rating.user.firstName}
                  </p>
                  <p className='text-sm text-zinc-500'>
                    {rating.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className='py-2 text-yellow-500'>
                {generateStars(rating.rating)}
              </p>
              <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                {rating.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='px-2 md:px-8'>
        {user && !hasUserRated && user.id !== product.user.clerkUserId && (
          <RatingComponent product={product} />
        )}
      </div>
    </div>
  )
}
