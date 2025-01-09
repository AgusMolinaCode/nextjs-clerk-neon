import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Product {
  id: string
  title: string
  slug: string
  description?: string | null
  price: number
  imageUrl?: string[]
  city?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  category: string
}

export type ProductInput = {
  title: string
  slug: string
  description?: string
  price: number
  imageUrl?: string
  userId: string
  city?: string
  tags?: string[]
  category?: string
}
