'use client'

import { Edit } from 'lucide-react'
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import ProductEditorForm from './form/ProductEditorForm'
import { Product } from '@/lib/utils'

const ProductEditor = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='text-xs font-semibold'>
          <Edit className='h-4 w-4 text-gray-500' />
        </DialogTrigger>
        <DialogContent className='dialog max-w-md border bg-gray-50 px-2 dark:bg-gray-950'>
          <DialogHeader>
            <DialogTitle className='text-md mt-[0.7rem] text-center font-semibold text-gray-500'>
              Editar {product.title}
            </DialogTitle>
          </DialogHeader>
          <ProductEditorForm product={product} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductEditor
