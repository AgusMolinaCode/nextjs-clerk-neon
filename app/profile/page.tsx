import React from 'react'
import { getProductsByUser, deleteProduct } from '@/lib/products'
import { getUserById } from '@/lib/users'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { ProductForm } from '@/components/form/ProductForm'

import Insights from '@/components/Insights'

import { ScrollArea } from '@/components/ui/scroll-area'
import ProductEditor from '@/components/ProductEditor'
import { Trash } from 'lucide-react'
import ProductDelete from '@/components/ProductDelete'

const page = async () => {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          Error: No se ha encontrado el usuario.
        </h1>
      </div>
    )
  }

  const { user } = await getUserById({ clerkUserId: userId })

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          Usuario no encontrado,vuelve a iniciar sesión
        </h1>
      </div>
    )
  }

  const products = await getProductsByUser(user?.id)

  const sanitizedProducts = products.map(product => ({
    ...product,
    description: product.description ?? '',
    imageUrl: product.imageUrl ?? '/assets/images/no-product.png'
  }))

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id)
        alert('Producto eliminado con éxito')
        // Aquí podrías actualizar el estado o recargar la página para reflejar los cambios
      } catch (error) {
        console.error('Error al eliminar el producto:', error)
      }
    }
  }

  return (
    <div className='flex gap-2 md:flex-row px-4'>
      <div className='mx-auto w-full lg:w-1/4'>
        <ProductForm userId={user.id} />
      </div>
      <div className='grid w-full place-items-center px-4 md:place-items-start lg:w-1/4'>
        <div className='flex w-full items-center justify-between gap-2 md:max-w-[360px]'>
          <h1 className='text-lg font-bold'>Mis Publicaciones</h1>
        </div>
        {sanitizedProducts.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ScrollArea className='h-[420px] w-full'>
            <ul className='flex h-[420px] w-full flex-col justify-start space-y-2'>
              {sanitizedProducts.map(product => {
                let firstImageUrl = '/assets/images/no-product.png'
                try {
                  if (product.imageUrl) {
                    const imageUrls = JSON.parse(product.imageUrl)
                    firstImageUrl = imageUrls[0] || firstImageUrl
                  }
                } catch (error) {
                  console.error('Error parsing imageUrl:', error)
                }

                return (
                  <div className='flex w-full justify-between gap-2 rounded-md border bg-gray-50 p-2 transition-all duration-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-800 md:max-w-[360px]'>
                    <Link
                      href={`/products/${product.slug}`}
                      key={product.id}
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
                      <ProductEditor product={product} />
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
      <div className='grid w-full place-items-center px-4 md:place-items-start lg:w-3/4 bg-red-500'></div>
    </div>
  )
}

export default page
