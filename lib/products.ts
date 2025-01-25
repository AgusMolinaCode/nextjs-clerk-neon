'use server'

import { generateSlug } from '@/constants'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

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

export interface RatingInput {
  productId: string
  userId: string
  rating: number
  comment?: string
}

export async function getProducts(city?: string, page: number = 1, limit: number = 8) {
  try {
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(limit, 50));
    const skip = (validPage - 1) * validLimit;

    const where: Prisma.ProductWhereInput = city
      ? {
          city: {
            contains: city,
            mode: 'insensitive' as Prisma.QueryMode
          }
        }
      : {};

    const total = await prisma.product.count({ where });

    if (total === 0) {
      return {
        products: [],
        totalPages: 0,
        currentPage: validPage
      };
    }

    const totalPages = Math.ceil(total / validLimit);
    const finalPage = Math.min(validPage, totalPages);
    const finalSkip = (finalPage - 1) * validLimit;

    const products = await prisma.product.findMany({
      where,
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
  return await prisma.product.findUniqueOrThrow({
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

export async function createRating(data: {
  productId: string;
  userId: string;
  rating: number;
  comment?: string;
}) {
  if (!data.productId || !data.userId) {
    throw new Error('Product ID and User ID are required');
  }

  try {
    // Verificar que el producto y el usuario existan
    const productExists = await prisma.product.findUnique({
      where: { id: data.productId }
    });

    const userExists = await prisma.user.findUnique({
      where: { id: data.userId }
    });

    if (!productExists) {
      throw new Error('Product not found');
    }

    if (!userExists) {
      throw new Error('User not found');
    }

    const newRating = await prisma.rating.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        product: {
          connect: {
            id: data.productId
          }
        },
        user: {
          connect: {
            id: data.userId
          }
        }
      },
      include: {
        user: {
          select: {
            firstName: true
          }
        }
      }
    });
    
    return { rating: newRating, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating rating:', error.message);
      return { rating: null, error: error.message };
    } else {
      console.error('Error creating rating:', error);
      return { rating: null, error: 'Unknown error' };
    }
  }
}

export async function getRating(productId: string) {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        productId
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        }
      }
    })

    return ratings
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return []
  }
}