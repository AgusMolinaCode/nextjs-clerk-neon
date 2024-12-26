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
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export function ProductForm({ userId }: { userId: string }) {
  const { toast } = useToast()
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processForm)}
        className='flex h-full w-full flex-col justify-between space-y-2 rounded-md border bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950'
      >
        <div className='h-full'>
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
                        if (!ready)
                          return <p className='text-center'>Preparando...</p>
                        if (isUploading)
                          return <p className='text-center'>Enviando...</p>
                        return (
                          <div className=''>
                            <ImageUp className='h-8 w-8 text-gray-400' />
                          </div>
                        )
                      },
                      allowedContent: ({ ready, fileTypes, isUploading }) => {
                        if (!ready)
                          return (
                            <p className='text-center'>
                              Verificando tipos de archivo permitidos...
                            </p>
                          )
                        if (isUploading)
                          return (
                            <p className='text-center'>Enviando archivo...</p>
                          )
                        return (
                          <div className='flex flex-col gap-2'>
                            <p className='text-center'>
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
                        toast({
                          duration: 3000,
                          title: 'Imágenes subidas con éxito',
                          description:
                            'Las imágenes han sido subidas correctamente, puedes continuar con el siguiente paso',
                          variant: 'default'
                        })
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.log(error)
                    }}
                  />
                </FormControl>
                <FormMessage />
                <div className='mx-auto grid w-full grid-cols-3 place-items-center items-center justify-center gap-2 pt-2'>
                  {field.value.map((url: string, index: number) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Imagen ${index + 1}`}
                      width={120}
                      height={120}
                      className='h-20 w-20 rounded-md object-cover'
                    />
                  ))}
                  {[...Array(3 - field.value.length)].map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className='relative flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-gray-500 bg-gray-100 dark:bg-gray-900'
                    >
                      <span className='text-xl text-gray-500'>
                        {field.value.length + index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>
        <ButtonSubmit>Crear publicación</ButtonSubmit>
      </form>
    </Form>
  )
}
