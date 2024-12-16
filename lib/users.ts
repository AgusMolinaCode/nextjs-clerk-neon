import prisma from './prisma'
import { User } from '@prisma/client'

export async function getUsers(limit?: number) {
  try {
    const users = await prisma.user.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return users
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data })
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getUserById({ id, clerkUserId }: { id?: number; clerkUserId?: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { id, clerkUserId } })
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}


export async function updateUser(id: number, data: Partial<User>) {
  try {
    const user = await prisma.user.update({ where: { id }, data })
    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function combineName(user: User) {
  return `${user.firstName} ${user.lastName}`
}
