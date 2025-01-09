import { z } from 'zod'

export const CreateFormSchema = z.object({
  title: z.string().min(1, { message: 'El título es obligatorio.' }),
  slug: z.string().min(1, { message: 'El slug es obligatorio.' }),
  description: z.string().optional(),
  price: z.coerce
    .number()
    .min(0, { message: 'El precio debe ser mayor o igual a 0.' }),
  imageUrl: z
    .array(z.string().url())
    .min(1, { message: 'Debes subir al menos una imagen.' })
    .max(3, { message: 'Puedes subir un máximo de 3 imágenes.' }),
  city: z.string().min(1, { message: 'La ciudad es obligatoria.' }),
  tags: z.array(z.string()).default([]),
  category: z.string().min(1, { message: 'La categoría es obligatoria.' })
})

export const UpdateFormSchema = CreateFormSchema.partial()
