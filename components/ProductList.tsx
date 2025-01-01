'use client'

import React, { useState } from 'react'
import { ProductForm } from './form/ProductForm'
import { ScrollArea } from './ui/scroll-area'
import Link from 'next/link'
import Image from 'next/image'
import ProductDelete from './ProductDelete'
import Insights from './Insights'
import { Product } from '@/lib/utils'
import { EditIcon } from 'lucide-react'

const ProductList = ({
  products,
  userId
}: {
  products: Product[]
  userId: string
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

  const handleSuccess = () => {
    setSelectedProduct(undefined) // Restablecer el producto seleccionado
  }

  const handleCancelEdit = () => {
    setSelectedProduct(undefined) // Restablecer el producto seleccionado al cancelar
  }

  return (
    <div>
      <div className='flex gap-2 px-4 md:flex-row'>
        <div className='mx-auto flex w-full justify-between lg:w-3/4'>
          <ProductForm
            userId={userId}
            product={
              selectedProduct
                ? {
                    ...selectedProduct,
                    imageUrl: selectedProduct.imageUrl ? JSON.stringify(selectedProduct.imageUrl) : undefined,
                  }
                : undefined
            }
            onSuccess={handleSuccess}
            onCancelEdit={handleCancelEdit} // Pasar el callback de cancelación
          />
        </div>
        <div className='grid w-full place-items-center px-4 md:place-items-start lg:w-1/4'>
          <div className='flex w-full items-center justify-between gap-2 md:max-w-[360px]'>
            <h1 className='text-lg font-bold'>Mis Publicaciones</h1>
          </div>
          {products.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <ScrollArea className='h-[420px] w-full'>
              <ul className='flex h-[420px] w-full flex-col justify-start space-y-2'>
                {products.map(product => {
                  const firstImageUrl = Array.isArray(product.imageUrl)
                    ? product.imageUrl[0]
                    : '/assets/images/no-product.png'

                  return (
                    <div
                      key={product.id}
                      className='flex w-full justify-between gap-2 rounded-md border bg-gray-50 p-2 transition-all duration-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-800 md:max-w-[360px]'
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className='flex items-center gap-2'
                      >
                        <li className='flex flex-col gap-4'>
                          <Image
                            src={firstImageUrl}
                            alt={product.title}
                            width={60}
                            height={60}
                            className='h-[60px] w-[60px] rounded-md border border-dashed border-gray-500 object-cover'
                          />
                        </li>
                        <div className='flex flex-col gap-2'>
                          <h2 className='text-sm font-semibold text-gray-900 dark:text-gray-300'>
                            {product.title}
                          </h2>
                          <p className='max-w-[260px] text-xs text-gray-500'>
                            {(product.description ?? '').length > 60
                              ? `${(product.description ?? '').slice(0, 60)}...`
                              : (product.description ?? '')}
                          </p>
                        </div>
                      </Link>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className='text-blue-500'
                        >
                          <EditIcon className='h-4 w-4 mb-1' />
                        </button>
                        <ProductDelete productId={product.id} />
                      </div>
                    </div>
                  )
                })}
              </ul>
            </ScrollArea>
          )}
          <div className='mt-[1rem] w-full'>
            <Insights />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
