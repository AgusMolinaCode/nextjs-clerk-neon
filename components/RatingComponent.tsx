'use client'

import React, { useState } from 'react'
import { Product } from '@/lib/utils'
import { createRating } from '@/lib/products'
import { RatingSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

interface RatingComponentProps {
  product: Product
}

type RatingInput = {
  productId: string
  rating: number
  comment?: string
}

const RatingComponent = ({ product }: RatingComponentProps) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof RatingSchema>>({
    resolver: zodResolver(RatingSchema),
    defaultValues: {
      rating: 5,
      comment: ''
    }
  })

  const handleSubmit = async (values: z.infer<typeof RatingSchema>) => {
    setIsLoading(true)

    if (!product.id) {
      console.error('Product ID is missing')
      return
    }

    const ratingData: RatingInput = {
      productId: product.id,
      rating: values.rating,
      comment: values.comment
    }

    try {
      const result = await createRating(ratingData)

      if (result.error) {
        console.error('Error al crear rating:', result.error)
      } else {
        toast({
          title: 'Calificación creada con éxito',
          description: 'Gracias por tu calificación.',
          variant: 'default'
        })
      }
    } catch (error) {
      console.error('Error al crear rating:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mx-auto mt-6 max-w-5xl rounded-lg border border-gray-700 bg-white/40 p-2 backdrop-blur-lg dark:border-gray-800 dark:bg-black/30'>
      <h3 className='mb-4 text-lg font-semibold'>Calificar Profesional</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div>
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <Select
                  value={field.value.toString()}
                  onValueChange={value => field.onChange(parseInt(value))}
                >
                  <FormLabel className='font-semibold text-gray-700 dark:text-gray-500'>
                    Calificación
                  </FormLabel>
                  <SelectTrigger className='w-32 border-gray-700 dark:border-gray-800 mt-3'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1</SelectItem>
                    <SelectItem value='2'>2</SelectItem>
                    <SelectItem value='3'>3</SelectItem>
                    <SelectItem value='4'>4</SelectItem>
                    <SelectItem value='5'>5</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-semibold text-gray-700 dark:text-gray-500'>
                    Comentario
                  </FormLabel>
                  <FormControl className='border-gray-700 dark:border-gray-800'>
                    <Textarea
                      rows={5}
                      placeholder='Deja tu comentario'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='font-semibold text-red-700 dark:text-red-500' />
                </FormItem>
              )}
            />
          </div>
          <div>
            <span className='rounded-lg bg-black/80 p-1 px-3 text-sm font-semibold text-red-500 dark:bg-transparent dark:px-0'>
              Una vez enviada, la calificación y el comentario no podrán ser
              editados ni eliminados.
            </span>
          </div>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Calificación'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default RatingComponent
