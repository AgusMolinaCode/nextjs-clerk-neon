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

export function CreateProductForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: 0,
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
      imageUrl: values.imageUrl[0] || '',
      userId: userId
    }

    try {
      const { product, error } = await createProduct(productData);
      if (error) {
        console.error('Error al crear el producto:', error);
      } else {
        console.log('Producto creado con éxito:', product);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className='mx-auto max-w-xs space-y-8'
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
                <Input placeholder='Descripción del producto' {...field} />
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
                <Input type='number' placeholder='0.00' {...field} />
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
              <FormLabel>Imágenes (máximo 4)</FormLabel>
              <FormControl>
                <Input
                  type='file'
                  multiple
                  accept='image/*'
                  onChange={e => {
                    const files = Array.from(e.target.files || [])
                    const urls = files.map(file => URL.createObjectURL(file))
                    form.setValue('imageUrl', urls)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Crear Producto</Button>
      </form>
    </Form>
  )
}
