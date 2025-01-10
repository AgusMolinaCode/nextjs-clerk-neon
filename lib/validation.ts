import { z } from 'zod'

export const CreateFormSchema = z.object({
  title: z.string().min(1, { message: 'El título es obligatorio.' }),
  slug: z.string().min(1, { message: 'El slug es obligatorio.' }),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  priceType: z.enum(['fixed', 'hourly', 'project']).default('fixed'),
  isUrgent: z.boolean().default(false),
  imageUrl: z
    .array(z.string().url())
    .min(1, { message: 'Debes subir al menos una imagen.' })
    .max(3, { message: 'Puedes subir un máximo de 3 imágenes.' }),
  city: z.string().min(1, { message: 'La ciudad es obligatoria.' }),
  tags: z.array(z.string()).default([]),
  category: z.string().min(1, { message: 'La categoría es obligatoria.' }),
  facebook: z.string().url({ message: 'Debe ser una URL válida' }).optional().or(z.literal('')),
  instagram: z.string().url({ message: 'Debe ser una URL válida' }).optional().or(z.literal(''))
})

export const UpdateFormSchema = CreateFormSchema.partial()
