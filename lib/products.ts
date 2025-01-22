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

export async function getProducts(city?: string, page: number = 1, limit: number = 8) {
  try {
    // Asegurar que page y limit sean números válidos
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 50)); // máximo 50 por página
    const skip = (validPage - 1) * validLimit;

    // Primero obtener el total para calcular páginas
    const total = await prisma.product.count({
      where: {
        ...(city && { 
          city: { 
            contains: city, 
            mode: 'insensitive' 
          } 
        })
      }
    });

    // Si no hay resultados, retornar temprano
    if (total === 0) {
      return {
        products: [],
        totalPages: 0,
        currentPage: validPage
      };
    }

    // Calcular el total de páginas
    const totalPages = Math.ceil(total / validLimit);
    
    // Asegurar que no excedamos el total de páginas
    const finalPage = Math.min(validPage, totalPages);
    const finalSkip = (finalPage - 1) * validLimit;

    // Obtener los productos para la página actual
    const products = await prisma.product.findMany({
      where: {
        ...(city && { 
          city: { 
            contains: city, 
            mode: 'insensitive' 
          } 
        })
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: finalSkip,
      take: validLimit
    });

    return {
      products: products.map(product => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        imageUrl: product.imageUrl as string[]
      })),
      totalPages,
      currentPage: finalPage
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      totalPages: 0,
      currentPage: 1
    };
  }
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
