'use client'

import { Product } from '@/lib/utils'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const ViewAllProducts = ({ products }: { products: Product[] }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='text-xs font-semibold'>Ver todas</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mis Publicaciones</DialogTitle>
          </DialogHeader>
          <ul className='flex flex-col space-y-2'>
            {products.map(product => {
              let firstImageUrl = '/assets/images/no-product.png';
              try {
                if (product.imageUrl) {
                  const imageUrls = JSON.parse(product.imageUrl);
                  firstImageUrl = imageUrls[0] || firstImageUrl;
                }
              } catch (error) {
                console.error('Error parsing imageUrl:', error);
              }

              return (
                <div className='flex w-full justify-between gap-2 rounded-md border bg-gray-50 p-2 transition-all duration-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-800'>
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.slug}
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
                  <Edit className='h-4 w-4 text-gray-500' />
                </div>
              )
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewAllProducts
