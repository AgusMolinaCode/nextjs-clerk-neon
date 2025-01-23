import { cn } from '@/lib/utils'
import {
  CircleDollarSign,
  CheckCircle,
  XCircle,
  Facebook,
  Instagram,
  Tag,
  Minus
} from 'lucide-react'
import Link from 'next/link'

interface CardProps {
  title?: string
  description?: string
  city?: string
  price?: number
  priceType?: string
  isUrgent?: boolean
  facebook?: string
  instagram?: string
  tags?: string[]
}

const CardBody = ({
  title,
  description,
  city,
  price,
  priceType,
  isUrgent,
  facebook,
  instagram,
  tags,
  className = 'p-4 flex flex-col gap-1 space-y-3'
}: CardProps & { className?: string }) => (
  <div className={cn('text-start', className)}>
    <div>
      <p className='text-lg font-bold text-gray-500 dark:text-gray-300 md:text-xl'>
        Descripcion:
      </p>
      <p className='max-w-lg text-gray-700 dark:text-gray-300'>{description}</p>
    </div>
    <div className='flex flex-wrap items-center justify-start gap-4'>
      <div>
        <p className='text-lg font-bold text-gray-500 dark:text-gray-300 md:text-xl'>
          Urgencias:
        </p>
        <div className='pt-1'>
          {isUrgent ? (
            <div className='flex items-center justify-start gap-2'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              <p className='text-sm font-semibold text-gray-500 dark:text-gray-300'>Si</p>
            </div>
          ) : (
            <div className='flex items-center justify-start gap-2'>
              <XCircle className='h-5 w-5 text-red-500' />
              <p className='text-sm font-semibold text-gray-500 dark:text-gray-300'>No</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className='text-lg font-bold text-gray-500 dark:text-gray-300 md:text-xl pt-1'>
          Precio:
        </p>
        <div className='flex items-center gap-2 pt-1'>
          <CircleDollarSign className='h-5 w-5 text-green-500' />
          <p className='text-sm font-semibold text-gray-500 dark:text-gray-300'>{price}</p>/
          <p className='text-sm font-semibold text-gray-500 dark:text-gray-300'>
            {priceType}
          </p>
        </div>
      </div>
    </div>
    {tags && tags.length > 0 && (
      <div className='pt-2 '>
        <p className='text-lg font-bold text-gray-500 dark:text-gray-300 md:text-xl'>
          Especialidades:
        </p>
        <div className='grid md:grid-cols-2 gap-2 pt-2 lg:grid-cols-3'>
          {tags.map((tag, index) => (
            <div
              key={index}
              className='flex items-center justify-start gap-1 rounded-full'
            >
              <Minus className='h-3 w-3 text-gray-600 dark:text-gray-300' />
              <span className='text-md font-semibold text-gray-700 dark:text-gray-300'>{tag}</span>
            </div>
          ))}
        </div>
    <div className='flex items-center justify-start gap-2 pt-8'>
      <div className='flex items-center justify-start gap-2'>
        <Link href={facebook ?? ''} target='_blank'>
          <Facebook className='h-5 w-5 text-blue-500' />
        </Link>
        <Link href={instagram ?? ''} target='_blank'>
          <Instagram className='h-5 w-5 text-pink-500' />
        </Link>
      </div>
    </div>
      </div>
    )}
  </div>
)

//======================================
export const SimpleCard_V1 = ({
  title,
  description,
  city,
  price,
  priceType,
  isUrgent,
  facebook,
  instagram,
  tags
}: CardProps) => {
  const Ellipses = () => {
    const sharedClasses =
      'rounded-md outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400'
    return (
      <div className='absolute z-0 grid h-full w-full items-center gap-8 lg:grid-cols-2'>
        <section className='absolute z-0 grid h-full w-full grid-cols-2 place-content-between'>
          <div className={`${sharedClasses} -mx-[2.5px]`}></div>
          <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
          <div className={`${sharedClasses} -mx-[2.5px]`}></div>
          <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
        </section>
      </div>
    )
  }
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className='relative mx-auto w-full rounded-lg border border-dashed border-zinc-300 px-4 dark:border-zinc-800 sm:px-6 md:px-8'>
      <div className='absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8'></div>
      <div className='absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8'></div>
      <div className='relative w-full border-x border-zinc-400 dark:border-zinc-700'>
        <Ellipses />
        <div className='relative z-20 mx-auto py-8'>{children}</div>
      </div>
    </div>
  )
  return (
    <div className=''>
      <Container>
        <div className='center w-full p-3'>
          <CardBody
            title={title}
            description={description}
            city={city}
            price={price}
            priceType={priceType}
            isUrgent={isUrgent}
            facebook={facebook}
            instagram={instagram}
            tags={tags}
          />
        </div>
      </Container>
    </div>
  )
}
