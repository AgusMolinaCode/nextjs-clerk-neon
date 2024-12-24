'use client'

import { generateSlug } from '@/constants'
import { ProductInput, updateProduct } from '@/lib/products'
import { Product } from '@/lib/utils'
import { UpdateFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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

import { UploadButton } from '@/utils/uploadthing'
import { ImageUp } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import Image from 'next/image'
import ButtonSubmit from '../ButtonSubmit'

const ProductEditorForm = ({ product }: { product: Product }) => {
  const form = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      title: product.title ?? '',
      slug: product.slug ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      imageUrl: JSON.parse(product.imageUrl || '[]')
    }
  })

  const title = useWatch({
    control: form.control,
    name: 'title'
  })

  form.setValue('slug', generateSlug(title ?? ''))

  const processForm = async (values: z.infer<typeof UpdateFormSchema>) => {
    const productData: ProductInput = {
      id: product.id,
      title: values.title ?? '',
      slug: generateSlug(values.title ?? ''),
      description: values.description ?? '',
      price: values.price ?? 0,
      imageUrl: JSON.stringify(values.imageUrl ?? []),
      userId: product.userId
    }

    try {
      const { product, error } = await updateProduct(productData)
      if (error) {
        console.error('Error al actualizar el producto:', error)
      } else {
        console.log('Producto actualizado con éxito:', product)
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className='space-y-8 rounded-md bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950 md:max-w-md'
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
                  <Textarea
                    rows={6}
                    placeholder='Descripción del producto'
                    {...field}
                  />
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
                <div className='mt-2 flex gap-2'>
                  {(field.value ?? []).map((url: string, index: number) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Imagen ${index + 1}`}
                      width={50}
                      height={50}
                      className='rounded-md'
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />

          <ButtonSubmit>Modificar publicación</ButtonSubmit>
        </form>
      </Form>
    </div>
  )
}

export default ProductEditorForm
