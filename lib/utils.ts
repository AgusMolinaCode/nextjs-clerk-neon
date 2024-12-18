import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type Product = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}