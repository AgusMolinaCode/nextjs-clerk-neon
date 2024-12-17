import React from 'react'
import { getProductsByUser } from '@/lib/products'
import { getUserById } from '@/lib/users'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
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
    <div className=''>
      <h1 className='text-center text-2xl font-bold'>Profile</h1>
      <div>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-7xl'>
            {products.map(product => (
              <li className='flex flex-col gap-2' key={product.id}>
                <Image
                  src={product.imageUrl || ''}
                  alt={product.title || ''}
                  width={200}
                  height={200}
                />
                <h2 className='text-lg font-bold'>{product.title}</h2>
                <p className='text-sm text-gray-500'>{product.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page
