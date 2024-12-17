import React from 'react'
import { getProductsByUser } from '@/lib/products'
import { getUserById } from '@/lib/users'
import { auth } from '@clerk/nextjs/server'

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
      <h1>Profile</h1>
      <div>
        <h2>Productos</h2>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page
