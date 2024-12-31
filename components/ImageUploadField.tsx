import React from 'react'
import { Control, useController, FieldValues, Path } from 'react-hook-form'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from '@/components/ui/form'
import { UploadButton } from '@/utils/uploadthing'
import { ImageUp } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

interface ImageUploadFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

const ImageUploadField = <T extends FieldValues>({
  control,
  name
}: ImageUploadFieldProps<T>) => {
  const { toast } = useToast()
  const { field, fieldState } = useController({ control, name })

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
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
                    return <p className='text-center'>Enviando archivo...</p>
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
                  field.onChange(imageUrls)
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
                console.log('Error al subir las imágenes', error)
              }}
            />
          </FormControl>

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
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

export default ImageUploadField
