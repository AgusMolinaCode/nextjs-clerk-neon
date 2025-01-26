import { z } from 'zod'

export const CreateFormSchema = z.object({
  title: z.string().min(5, { message: 'El título debe tener al menos 5 caracteres.' }),
  slug: z.string().min(1, { message: 'El slug es obligatorio.' }),
  description: z.string()
    .min(20, { message: 'La descripción debe tener al menos 20 caracteres.' })
    .max(600, { message: 'La descripción no puede exceder los 600 caracteres.' }),
  price: z.coerce.number()
    .min(0, { message: 'El precio no puede ser negativo.' })
    .optional(),
  priceType: z.enum(['fixed', 'hourly', 'project']).default('fixed'),
  isUrgent: z.boolean().default(false),
  imageUrl: z
    .array(z.string().url())
    .min(1, { message: 'Debes subir al menos una imagen.' })
    .max(3, { message: 'Puedes subir un máximo de 3 imágenes.' }),
  city: z.string().min(1, { message: 'La ubicación es obligatoria.' }),
  tags: z.array(z.string()).min(1, { message: 'Agrega al menos un tag.' }).max(3),
  category: z.string().min(1, { message: 'La categoría es obligatoria.' }),
  facebook: z.string()
    .url({ message: 'Debe ser una URL válida de Facebook' })
    .optional()
    .or(z.literal('')),
  instagram: z.string()
    .url({ message: 'Debe ser una URL válida de Instagram' })
    .optional()
    .or(z.literal(''))
})

export const UpdateFormSchema = CreateFormSchema.partial()

export const RatingSchema = z.object({
  rating: z.number().min(1, { message: 'La calificación debe ser al menos 1.' }).max(5, { message: 'La calificación debe ser como máximo 5.' }),
  comment: z
    .string()
    .min(20, { message: 'El comentario debe tener al menos 20 caracteres.' })
    .max(300, { message: 'El comentario no puede exceder los 300 caracteres.' })
})
