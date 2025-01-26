import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { productId, userId, rating, comment } = await req.json();

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
      }
    });

    return NextResponse.json({ rating: newRating });
  } catch (error) {
    console.error('Error creating rating:', error);
    return NextResponse.json({ error: 'Error creating rating' }, { status: 500 });
  }
} 