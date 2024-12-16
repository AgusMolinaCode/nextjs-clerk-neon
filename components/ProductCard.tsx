import Link from 'next/link'
import React from 'react'

interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  slug: string
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className='border p-4'>
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className='h-48 w-full object-cover'
        />
        <h2 className='text-lg font-bold'>{product.title}</h2>
        <p>{product.description}</p>
      </Link>
    </div>
  )
}

export default ProductCard
