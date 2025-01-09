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
  city?: string | null
  category?: string
  tags?: string | null
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
        imageUrl: data.imageUrl ? JSON.parse(data.imageUrl) : [],
        userId: data.userId,
        city: data.city,
        tags: data.tags ? JSON.stringify(data.tags) : '',
        category: data.category || ''
      }
    })

    revalidatePath('/profile')

    return { product: JSON.parse(JSON.stringify(product)), error: null }
  } catch (error) {
    console.error('Error al crear el producto:', error)
    return { product: null, error: JSON.parse(JSON.stringify(error)) }
  }
}

export async function updateProduct(productData: ProductInput) {
  if (!productData.id) {
    throw new Error('El id del producto es necesario para actualizarlo.')
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productData.id },
      data: {
        title: productData.title,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        imageUrl: productData.imageUrl ? JSON.parse(productData.imageUrl) : [],
        userId: productData.userId,
        city: productData.city,
        tags: productData.tags ? JSON.stringify(productData.tags) : '',
        category: productData.category || ''
      }
    })
    revalidatePath('/profile')
    return { product: updatedProduct, error: null }
  } catch (error) {
    return { product: null, error }
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
