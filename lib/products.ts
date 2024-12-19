'use server'

import prisma from './prisma'
import { revalidatePath } from 'next/cache';

export interface ProductInput {
  title: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  userId: string; // Asegúrate de incluir userId
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

export async function getProductsByUser(userId: string) {
  const products = await prisma.product.findMany({
    where: {
      userId: userId
    }
  });

  return products;
}

export async function createProduct(data: ProductInput) {
  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl || '',
        userId: data.userId
      }
    });

    revalidatePath('/profile');

    return { product: JSON.parse(JSON.stringify(product)), error: null };
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return { product: null, error: JSON.parse(JSON.stringify(error)) };
  }
}