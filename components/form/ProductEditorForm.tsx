'use client'

import { generateSlug } from '@/constants'
import { ProductInput, updateProduct } from '@/lib/products'
import { Product } from '@/lib/utils'
import { UpdateFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'

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
import ImageUploadField from '../ImageUploadField'
import Mapa from '../Mapa'

const ProductEditorForm = ({
  product,
  onClose
}: {
  product: Product
  onClose: () => void
}) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      title: product.title ?? '',
      slug: product.slug ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      imageUrl: product.imageUrl ?? [],
      city: product.city ?? ''
    }
  })

  const title = useWatch({
    control: form.control,
    name: 'title'
  })

  form.setValue('slug', generateSlug(title ?? ''))

  const handleCityChange = (city: string) => {
    form.setValue('city', city)
  }

  const processForm = async (values: z.infer<typeof UpdateFormSchema>) => {
    const productData: ProductInput = {
      id: product.id,
      title: values.title ?? '',
      slug: generateSlug(values.title ?? ''),
      description: values.description ?? '',
      price: values.price ?? 0,
      imageUrl: JSON.stringify(values.imageUrl ?? []),
      userId: product.userId,
      city: values.city ?? ''
    }

    try {
      const { product, error } = await updateProduct(productData)
      if (error) {
        console.error('Error al actualizar el producto:', error)
      } else {
        console.log('Producto actualizado con éxito:', product)
        toast({
          duration: 3000,
          title: 'Producto actualizado con éxito',
          description: 'El producto ha sido actualizado correctamente',
          variant: 'default'
        })
        onClose()
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
          <ImageUploadField control={form.control} name='imageUrl' />
          <FormField
            control={form.control}
            name='city'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Ubicación</FormLabel>
                <Mapa onCityChange={handleCityChange} />
                <FormMessage />
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
