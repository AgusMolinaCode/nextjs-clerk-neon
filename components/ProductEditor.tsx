import { getProductBySlug } from '@/lib/products'
import { CircleX, Edit, X } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import ProductEditorForm from './form/ProductEditorForm'
import { Cross2Icon } from '@radix-ui/react-icons'

const ProductEditor = async ({ slug }: { slug: string }) => {
  const product = await getProductBySlug(slug)
  if (!product) {
    return <div>Producto no encontrado</div>
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className='text-xs font-semibold'>
          <Edit className='h-4 w-4 text-gray-500' />
        </DialogTrigger>
        <DialogContent className='dialog max-w-md border bg-gray-50 px-2 dark:bg-gray-950'>
          <DialogHeader>
            <DialogTitle className='text-md mt-[0.7rem] text-center font-semibold text-gray-500'>
              Editar {product.title}
            </DialogTitle>
          </DialogHeader>
          <ProductEditorForm product={product} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductEditor
