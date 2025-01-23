'use client'

import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function CarouselComponent({ images }: { images: string[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className='mx-auto max-w-lg lg:mx-0 rounded-md'>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            active: true,
            stopOnInteraction: false,
            stopOnMouseEnter: true
          })
        ]}
        setApi={setApi}
        className='w-full max-w-lg rounded-md'
      >
        <CarouselContent className='rounded-md'>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className='dark:bg-gray-900 bg-gray-300 rounded-md'>
                <CardContent className='flex h-[300px] w-full items-center justify-center p-0 md:h-[500px] md:w-[500px]'>
                  <Image
                    width={500}
                    height={500}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className='h-full w-full object-contain  md:h-[500px] md:w-[500px] rounded-md'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious className='absolute left-0 bottom-0' /> */}
        {/* <CarouselNext className='absolute right-0 bottom-[-50%]' /> */}
      </Carousel>
      <div className='py-2 text-center text-sm text-muted-foreground'>
        {current} de {count}
      </div>
    </div>
  )
}
