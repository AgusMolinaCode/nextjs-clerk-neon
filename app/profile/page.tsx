import React from 'react'
import { getProductsByUser } from '@/lib/products'
import { getUserById } from '@/lib/users'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { CreateProductForm } from '@/components/form/CreateProductForm'

const page = async () => {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1>Error: No se ha encontrado el usuario.</h1>
      </div>
    )
  }

  const { user } = await getUserById({ clerkUserId: userId })

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1>Error: Usuario no encontrado.</h1>
      </div>
    )
  }

  const products = await getProductsByUser(user?.id)

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <div className='lg:w-1/3'>
        <CreateProductForm />
      </div>
      <div className='md:w-2/3'>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {products.map(product => (
              <Link href={`/products/${product.slug}`} key={product.id}>
                <li className='flex flex-col gap-2'>
                  <Image
                    src={product.imageUrl || ''}
                    alt={product.title || ''}
                    width={200}
                    height={200}
                  />
                  <h2 className='text-lg font-bold'>{product.title}</h2>
                  <p className='text-sm text-gray-500'>{product.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page
