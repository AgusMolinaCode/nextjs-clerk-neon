'use client'

import React, { useState } from 'react'
import { deleteProduct } from '@/lib/products'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Trash } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const ProductDelete = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await deleteProduct(productId)
      toast({
        duration: 3000,
        title: 'Producto eliminado con éxito',
        description: 'El producto ha sido eliminado correctamente',
        variant: 'default'
      })
      setOpen(false)
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
      toast({
        duration: 3000,
        title: 'Error al eliminar el producto',
        description: 'Hubo un problema al intentar eliminar el producto',
        variant: 'destructive'
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button>
            <Trash className='h-4 w-4 text-red-800' />
          </button>
        </DialogTrigger>
        <DialogContent className='dialog max-w-md border bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-950'>
          <DialogHeader>
            <DialogTitle className='text-md mt-[0.7rem] text-center font-semibold text-gray-500'>
              Confirmar eliminación
            </DialogTitle>
          </DialogHeader>
          <div className='p-4'>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={handleDelete}
                className='rounded-md bg-red-500 px-4 py-2 text-white'
              >
                Eliminar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductDelete
