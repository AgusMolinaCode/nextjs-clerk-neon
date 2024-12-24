'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateFormSchema } from '@/lib/validation'
import { generateSlug } from '@/constants'
import { createProduct, ProductInput } from '@/lib/products'
import { UploadButton } from '@/utils/uploadthing'
import { ImageUp } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import ButtonSubmit from '../ButtonSubmit'

export function ProductForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: undefined,
      imageUrl: [] as string[]
    }
  })

  const title = useWatch({
    control: form.control,
    name: 'title'
  })

  form.setValue('slug', generateSlug(title))

  const processForm = async (values: z.infer<typeof CreateFormSchema>) => {
    const productData: ProductInput = {
      title: values.title,
      slug: generateSlug(values.title),
      description: values.description,
      price: values.price,
      imageUrl: JSON.stringify(values.imageUrl),
      userId: userId
    }

    try {
      const { product, error } = await createProduct(productData)
      if (error) {
        console.error('Error al crear el producto:', error)
      } else {
        console.log('Producto creado con éxito:', product)
      }
    } catch (error) {
      console.error('Error al crear el producto:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className='space-y-8 rounded-md border bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950 md:max-w-md'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder='Título del producto' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder='Descripción del producto' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='0.00'
                  {...field}
                  className='appearance-none'
                  style={{ MozAppearance: 'textfield' }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <UploadButton
                  appearance={{
                    button:
                      'w-full bg-transparent border border-dashed dark:border-gray-500 rounded-md p-2 h-20',
                    container: 'w-full',
                    allowedContent: 'w-full'
                  }}
                  content={{
                    button: ({ ready, isUploading }) => {
                      if (!ready) return 'Preparando...'
                      if (isUploading) return 'Enviando...'
                      return (
                        <div className=''>
                          <ImageUp className='h-8 w-8 text-gray-400' />
                        </div>
                      )
                    },
                    allowedContent: ({ ready, fileTypes, isUploading }) => {
                      if (!ready)
                        return 'Verificando tipos de archivo permitidos...'
                      if (isUploading) return 'Enviando archivo...'
                      return (
                        <div className='flex flex-col gap-2'>
                          <p className='pt-3 text-center'>
                            Puede subir máximo 3 archivos
                          </p>
                        </div>
                      )
                    }
                  }}
                  endpoint='imageUploader'
                  onClientUploadComplete={res => {
                    if (res && res.length > 0) {
                      const imageUrls = res.map(file => file.url)
                      form.setValue('imageUrl', imageUrls)
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.log(error)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit>Crear publicación</ButtonSubmit>
      </form>
    </Form>
  )
}
