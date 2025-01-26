import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getRating } from '@/lib/products'

interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  slug: string
}

interface CardProps {
  children?: React.ReactNode
}

export const Card_with_image_v2 = ({
  children,
  imageUrl,
  alt
}: CardProps & { imageUrl: string; alt: string }) => {

  const ratings = await getRating(product.id)

  return (
    <div className='group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700'>
      <Image
        fill
        className='m-0 w-full object-cover'
        src={imageUrl}
        alt={alt}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII='
      />
      {/* overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/10'></div>
      {children}
    </div>
  )
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className=''>
      <Card_with_image_v2
        imageUrl={product.imageUrl || '/assets/images/no-product.png'}
        alt={product.title}
      >
        <div className='absolute inset-0 flex size-full flex-col justify-end px-4 pb-1'>
          <h3 className='text-md font-bold tracking-tighter text-gray-200'>
            {product.title}
          </h3>
        </div>
      </Card_with_image_v2>
    </Link>
  )
}

export default ProductCard
