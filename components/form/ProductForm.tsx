'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { CreateFormSchema, UpdateFormSchema } from '@/lib/validation'
import { createProduct, updateProduct, ProductInput } from '@/lib/products'
import { useToast } from '@/hooks/use-toast'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageUploadField from '@/components/ImageUploadField'
import Mapa from '@/components/Mapa'
import ButtonSubmit from '../ButtonSubmit'
import { generateSlug } from '@/constants'
import { ArrowBigLeft, ArrowLeft } from 'lucide-react'

interface ProductFormProps {
  userId: string
  product?: ProductInput
  onSuccess?: () => void
  onCancelEdit?: () => void
}

export function ProductForm({ userId, product, onSuccess, onCancelEdit }: ProductFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        slug: product.slug,
        description: product.description ?? undefined,
        price: product.price,
        imageUrl: product.imageUrl ? JSON.parse(product.imageUrl) : [],
        city: product.city ?? undefined
      })
    }
  }, [product, form])

  const handleCityChange = (city: string) => {
    form.setValue('city', city)
  }

  const createSubmit = async (values: z.infer<typeof CreateFormSchema>) => {
    setIsLoading(true)
    const productData: ProductInput = {
      title: values.title,
      slug: generateSlug(values.title),
      description: values.description,
      price: values.price ?? 0,
      imageUrl: JSON.stringify(values.imageUrl),
      userId: userId,
      city: values.city
    }

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
        form.reset({
          title: '',
          slug: '',
          description: '',
          price: 0,
          imageUrl: [],
          city: ''
        })
        onSuccess?.()
      }
    } catch (error) {
      console.error('Error al crear el producto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSubmit = async (values: z.infer<typeof UpdateFormSchema>) => {
    setIsLoading(true)
    const productData: ProductInput = {
      id: product?.id ?? '',
      title: values.title ?? '',
      slug: generateSlug(values.title ?? ''),
      description: values.description ?? '',
      price: values.price ?? 0,
      imageUrl: JSON.stringify(values.imageUrl ?? []),
      userId: userId,
      city: values.city ?? ''
    }

    try {
      const { product, error } = await updateProduct(productData)
      if (error) {
        console.error('Error al actualizar el producto:', error)
      } else {
        toast({
          duration: 3000,
          title: 'Producto actualizado con éxito',
          description: 'El producto ha sido actualizado correctamente',
          variant: 'default'
        })
        form.reset({
          title: '',
          slug: '',
          description: '',
          price: 0,
          imageUrl: [],
          city: ''
        })
        onSuccess?.()
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = product ? updateSubmit : createSubmit

  return (
    <div className='flex w-full flex-col justify-between'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='flex gap-2 w-full flex-col justify-between rounded-md border bg-gray-50 dark:border-gray-800 dark:bg-gray-950 p-2'
        >
          {product && (
              <button
                type='button'
                onClick={() => {
                  form.reset({
                    title: '',
                    slug: '',
                    description: '',
                    price: 0,
                    imageUrl: [],
                    city: ''
                  })
                  onCancelEdit?.()
                }}
                className='flex items-center gap-1 text-xs text-blue-500'
              >
                <ArrowLeft className='w-4 h-4' />
                Cancelar Edición
              </button>
            )}
          <div className='flex w-full justify-between gap-1'>
            <div className='flex w-full flex-col gap-2'>
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
                render={({ field, fieldState }) => (
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
                    <FormMessage>{fieldState.error?.message}</FormMessage>
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
                  <Mapa
                    onCityChange={handleCityChange}
                    initialCity={product?.city}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

      
            <ButtonSubmit disabled={isLoading}>
              {isLoading ? (product ? 'Editando...' : 'Creando...') : (product ? 'Editar Publicación' : 'Crear Publicación')}
            </ButtonSubmit>
            
   
        </form>
      </Form>
    </div>
  )
}
