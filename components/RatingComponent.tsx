'use client'

import React, { useState } from 'react'
import { Product } from '@/lib/utils'
import { createRating } from '@/lib/products'
import { useUser } from '@clerk/nextjs'

interface RatingComponentProps {
  product: Product
  userId: string
}

const RatingComponent = ({ product, userId }: RatingComponentProps) => {
  const [rating, setRating] = useState<number>(1)
  const [comment, setComment] = useState<string>('')

  const { user } = useUser()

  console.log(user?.id , user?.firstName)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!product.id || !userId) {
      console.error('Product ID or User ID is missing')
      return
    }

    console.log(userId)

    try {
      const result = await createRating({
        productId: product.id,
        userId,
        rating,
        comment
      })

      if (result.error) {
        console.error('Error al crear rating:', result.error)
      } else {
        // Limpiar el formulario
        setRating(1)
        setComment('')
        // Recargar la página para ver el nuevo rating
        window.location.reload()
      }
    } catch (error) {
      console.error('Error al crear rating:', error)
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Calificar Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            Calificación (1-5):
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 p-2 border rounded"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Comentario:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              rows={3}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar Calificación
        </button>
      </form>
    </div>
  )
}

export default RatingComponent