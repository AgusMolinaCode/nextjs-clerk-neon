import NotFound from '@/app/not-found'
import { getProductBySlug } from '@/lib/products'
import React from 'react'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return <NotFound />
  }

  return (
    <div className='pb-24 pt-40'>
        <h1 className='text-2xl font-semibold'>{product?.title}</h1>
        <p className='text-sm text-gray-500'>{product?.description}</p>
    </div>
  )
}
