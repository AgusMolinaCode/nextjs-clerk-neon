import NotFound from '@/app/not-found'
import { getProductBySlug } from '@/lib/products'

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

  if (!product) {
    return <NotFound />
  }

  return (
    <div className='pb-24 pt-40'>
      <h1 className='text-2xl font-semibold'>{product.title}</h1>
      <p className='text-sm text-gray-500'>{product.description}</p>
    </div>
  )
}
