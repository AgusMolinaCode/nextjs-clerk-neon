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
      <div className='lg:w-1/3'>
        <CreateProductForm userId={user.id} />
      </div>
      <div className='md:w-2/3'>
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map(product => {
              let firstImageUrl = '/assets/images/no-product.png';
              try {
                if (product.imageUrl) {
                  if (product.imageUrl.startsWith('[')) {
                    const imageUrls = JSON.parse(product.imageUrl);
                    firstImageUrl = imageUrls[0];
                  } else {
                    firstImageUrl = product.imageUrl;
                  }
                }
              } catch (error) {
                console.error('Error parsing imageUrl:', error);
              }

              return (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  <li className='flex flex-col gap-2'>
                    <h2 className='text-lg font-bold'>{product.title}</h2>
                    <Image
                      src={firstImageUrl}
                      alt={product.title}
                      width={200}
                      height={200}
                      priority
                      className='rounded-md border-2 border-gray-200 object-cover dark:border-none'
                    />
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default page
