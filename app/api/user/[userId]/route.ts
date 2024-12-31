import { NextResponse } from 'next/server'
import { getUserById, getProductsByUser } from '@/lib/users'

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const user = await getUserById({ clerkUserId: params.userId })
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  const products = await getProductsByUser(user.id)
  return NextResponse.json({ user, products })
} 