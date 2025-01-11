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
  price?: number | null
  priceType: 'fixed' | 'hourly' | 'project'
  isUrgent: boolean
  imageUrl?: string[]
  city?: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  category: string
  facebook: string
  instagram: string
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
  facebook?: string
  instagram?: string
  priceType?: string
  isUrgent?: boolean
}
