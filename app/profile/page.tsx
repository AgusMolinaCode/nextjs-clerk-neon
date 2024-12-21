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
    <div className='flex flex-col gap-8 md:flex-row'>
      <div className='w-full px-4 lg:w-1/4 mx-auto'>
        <CreateProductForm userId={user.id} />
      </div>
      <div className='w-full lg:w-3/4'>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 px-4'>
            {products.map(product => {
              let firstImageUrl = '/assets/images/no-product.png'
              try {
                if (product.imageUrl) {
                  if (product.imageUrl.startsWith('[')) {
                    const imageUrls = JSON.parse(product.imageUrl)
                    firstImageUrl = imageUrls[0]
                  } else {
                    firstImageUrl = product.imageUrl
                  }
                }
              } catch (error) {
                console.error('Error parsing imageUrl:', error)
              }

              return (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className='relative block'
                >
                  <li className='flex flex-col gap-2'>
                    <Image
                      src={firstImageUrl || '/assets/images/no-product.png'}
                      alt={product.title}
                      width={300}
                      height={300}
                      className='h-[300px] w-full rounded-md object-cover' 
                    />
                    <div className=''>
                      <p className='absolute left-2 top-1 bg-black rounded-xl px-2 py-1 text-white'>{product.title}</p>
                    </div>
                  </li>
                </Link>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page
