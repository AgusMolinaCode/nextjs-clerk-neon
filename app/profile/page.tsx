import React from 'react'
import { getProductsByUser } from '@/lib/products'
import { getUserById } from '@/lib/users'
import { auth } from '@clerk/nextjs/server'

import ProductList from '@/components/ProductList'
const page = async () => {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-xl font-bold'>
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
          Usuario no encontrado, vuelve a iniciar sesión
        </h1>
      </div>
    )
  }

  const products = await getProductsByUser(user.id)

  const productsWithCorrectCity = products.map(product => ({
    ...product,
    city: product.city ?? undefined
  }))

  return (
    <>
      <ProductList products={productsWithCorrectCity} userId={user.id} />
    </>
  )
}

export default page
