import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Product = {
  title: string
  slug: string
  description?: string | null
  price: number
  imageUrl?: string | null
  userId: string
}

export type ProductInput = {
  title: string
  slug: string
  description?: string
  price: number
  imageUrl: string
  userId: string
}
