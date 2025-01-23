import { cn } from '@/lib/utils'
import { MapPinned } from 'lucide-react'

interface CardProps {
  title?: string
  description?: string
  city?: string
}

const CardBody = ({
  title,
  description,
  city,
  className = 'p-4 flex gap-1'
}: CardProps & { className?: string }) => (
  <div className={cn('text-start', className)}>
    <div>
      <h3 className='mb-1 text-lg font-bold text-gray-900 dark:text-gray-100'>
        {title}
      </h3>
      <p className='max-w-xl text-gray-700 dark:text-gray-300'>{description}</p>
    </div>
    <div>
      <div className='flex items-center gap-2'>
        <MapPinned />
        <p className='text-sm text-gray-500 dark:text-gray-300'>{city}</p>
      </div>
    </div>
  </div>
)

//======================================
export const SimpleCard_V1 = ({ title, description, city }: CardProps) => {
  const Ellipses = () => {
    const sharedClasses =
      'rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400'
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
          <CardBody title={title} description={description} city={city} />
        </div>
      </Container>
    </div>
  )
}
