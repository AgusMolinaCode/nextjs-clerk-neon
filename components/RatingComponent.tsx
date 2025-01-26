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
      rating: 1,
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
    <div className='mt-6 rounded-lg border dark:border-gray-800 border-gray-700 p-2 max-w-5xl mx-auto bg-black/10 dark:bg-black/30 backdrop-blur-lg'>
      <h3 className='mb-4 text-lg font-semibold'>
        Calificar Profesional
      </h3>
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
                  <SelectTrigger className='border-gray-700 dark:border-gray-800 w-32'>
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
                  <FormLabel>Comentario</FormLabel>
                  <FormControl className='border-gray-700 dark:border-gray-800'>
                    <Textarea
                      rows={5}
                      placeholder='Deja tu comentario'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
