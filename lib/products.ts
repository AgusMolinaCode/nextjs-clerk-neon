'use server'

import { generateSlug } from '@/constants'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'

export interface ProductInput {
  id?: string
  title: string
  slug: string
  description?: string | null
  price?: number | null
  priceType?: 'fixed' | 'hourly' | 'project'
  isUrgent?: boolean
  imageUrl?: string | null
  userId: string
  city?: string | null
  category?: string
  tags?: string[]
  facebook?: string
  instagram?: string
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
        price: data.price ?? 0,
        priceType: data.priceType || 'fixed',
        isUrgent: data.isUrgent || false,
        imageUrl: data.imageUrl ? JSON.parse(data.imageUrl) : [],
        userId: data.userId,
        city: data.city,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === 'string'
            ? JSON.parse(data.tags)
            : [],
        category: data.category || '',
        facebook: data.facebook || '',
        instagram: data.instagram || ''
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
        price: productData.price ?? 0,
        priceType: productData.priceType || 'fixed',
        isUrgent: productData.isUrgent || false,
        imageUrl: productData.imageUrl ? JSON.parse(productData.imageUrl) : [],
        userId: productData.userId,
        city: productData.city,
        tags: Array.isArray(productData.tags)
          ? productData.tags
          : typeof productData.tags === 'string'
            ? JSON.parse(productData.tags)
            : [],
        category: productData.category || '',
        facebook: productData.facebook || '',
        instagram: productData.instagram || ''
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
