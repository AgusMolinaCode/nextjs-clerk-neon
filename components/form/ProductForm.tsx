'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateFormSchema } from '@/lib/validation'
import { generateSlug } from '@/constants'
import { createProduct, ProductInput } from '@/lib/products'
import { Textarea } from '../ui/textarea'
import ButtonSubmit from '../ButtonSubmit'
import { useToast } from '@/hooks/use-toast'
import ImageUploadField from '../ImageUploadField'
import { FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import Mapa from '../Mapa'

export function ProductForm({ userId }: { userId: string }) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: undefined,
      imageUrl: [] as string[],
      city: ''
    }
  })

  const title = useWatch({
    control: form.control,
    name: 'title'
  })

  form.setValue('slug', generateSlug(title))

  const handleCityChange = (city: string) => {
    form.setValue('city', city)
  }

  const processForm = async (values: z.infer<typeof CreateFormSchema>) => {
    const productData: ProductInput = {
      title: values.title,
      slug: generateSlug(values.title),
      description: values.description,
      price: values.price,
      imageUrl: JSON.stringify(values.imageUrl),
      userId: userId,
      city: values.city
    }
    console.log(productData)

    try {
      const { product, error } = await createProduct(productData)
      if (error) {
        console.error('Error al crear el producto:', error)
      } else {
        toast({
          duration: 3000,
          title: 'Producto creado con éxito',
          description: 'El producto ha sido creado correctamente',
          variant: 'default'
        })
      }
      form.reset()
    } catch (error) {
      console.error('Error al crear el producto:', error)
    }
  }

  return (
    <div className='flex h-full w-full flex-col justify-between'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className='flex h-full w-full flex-col justify-between space-y-2 rounded-md border bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950'
        >
          <div className='flex w-full justify-between gap-2'>
            <div className='flex w-full flex-col gap-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='w-full'>
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
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder='Descripción del producto'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full justify-between gap-2'>
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
          </div>
          <ButtonSubmit>Crear publicación</ButtonSubmit>
        </form>
      </Form>
    </div>
  )
}
