import prisma from './prisma'
import { Product } from './utils';



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

export async function createProduct(product: Product) {
  // Implementa la lógica para crear un producto
  return await prisma.product.create({
    data: product
  });
}
