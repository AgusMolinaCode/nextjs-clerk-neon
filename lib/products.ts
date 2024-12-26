'use server'

import { generateSlug } from '@/constants'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'

export interface ProductInput {
  id?: string
  title: string
  slug: string
  description?: string | null
  price: number
  imageUrl?: string | null
  userId: string
}

export async function getProducts(
  limit?: number,
  sort: 'title' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc'
) {
  const products = await prisma.product.findMany({
    orderBy: {
      [sort]: order
    },
    take: limit
  })

  return products
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug
    }
  })
}

export async function getProductsByUser(userId: string, limit?: number) {
  const products = await prisma.product.findMany({
    where: {
      userId: userId
    },
    take: limit
  })

  return products
}

export async function createProduct(data: ProductInput) {
  try {
    let slug = generateSlug(data.title)
    let existingProduct = await prisma.product.findUnique({
      where: { slug }
    })

    let suffix = 1
    while (existingProduct) {
      slug = `${generateSlug(data.title)}-${suffix}`
      existingProduct = await prisma.product.findUnique({
        where: { slug }
      })
      suffix++
    }

    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: slug,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        userId: data.userId
      }
    })

    revalidatePath('/profile')

    return { product: JSON.parse(JSON.stringify(product)), error: null }
  } catch (error) {
    console.error('Error al crear el producto:', error)
    return { product: null, error: JSON.parse(JSON.stringify(error)) }
  }
}

export async function updateProduct(data: ProductInput) {
  if (!data.id) {
    throw new Error('El id del producto es necesario para actualizarlo.')
  }

  try {
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        userId: data.userId
      }
    })

    revalidatePath('/profile')

    return { product: JSON.parse(JSON.stringify(product)), error: null }
  } catch (error) {
    console.error('Error al actualizar el producto:', error)
    return { product: null, error: JSON.parse(JSON.stringify(error)) }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/profile')
  } catch (error) {
    console.error('Error al eliminar el producto:', error)
  }
}
