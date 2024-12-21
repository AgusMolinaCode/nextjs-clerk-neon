'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

export function CreateProductForm({ userId }: { userId: string }) {
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
        className=' md:max-w-md space-y-8 rounded-md border p-2 dark:border-gray-800'
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

                      alert('Upload Completed')
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! al subir las imágenes`)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button className='group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 dark:bg-white px-6 font-medium text-neutral-100 dark:text-neutral-800 w-full'>
          <span>Crear producto</span>
          <div className='w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100'>
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
            >
              <path
                d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'
              ></path>
            </svg>
          </div>
        </button>
      </form>
    </Form>
  )
}
