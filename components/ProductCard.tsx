import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  slug: string
}

const truncateDescription = (description: string) => {
  const words = description.split(' ');
  return words.length > 5 
    ? words.slice(0, 5).join(' ') + '...' 
    : description;
}

interface CardProps {
  children?: React.ReactNode;
}

export const Card_with_image_v2 = ({
  children,
  imageUrl,
  alt
}: CardProps & { imageUrl: string; alt: string }) => {
  return (
    <div className="rounded-2xl relative aspect-[4/3] overflow-hidden group border dark:border-gray-700 border-gray-200">
      <Image
        fill
        className="w-full object-cover m-0"
        src={imageUrl}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
      />
      {/* overlay */}
      <div className="absolute inset-0 from-black/95 via-black/70 to-black/10 bg-gradient-to-t"></div>
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
        <div className="absolute px-4 pb-1 inset-0 flex flex-col justify-end size-full">
          <h3 className="text-md font-bold text-gray-200 tracking-tighter">
            {product.title}
          </h3>
          {/* <p className="text-gray-100 lg:text-sm text-xs">
            {truncateDescription(product.description)}
          </p> */}
        </div>
      </Card_with_image_v2>
    </Link>
  )
}

export default ProductCard
