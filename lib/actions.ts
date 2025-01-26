'use server'

import prisma from './prisma'

export async function createRatingAction(productId: string, userId: string, rating: number, comment?: string) {
  try {
    // Verificar rating existente
    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId
        }
      }
    });

    if (existingRating) {
      return { 
        rating: null, 
        error: 'Ya has calificado este producto' 
      };
    }

    const newRating = await prisma.rating.create({
      data: {
        rating,
        comment,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
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
    console.error('Error creating rating:', error);
    return { rating: null, error };
  }
} 