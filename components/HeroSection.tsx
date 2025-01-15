'use client'

import React from 'react'
import Image from 'next/image'
import { Carousel, Card } from '@/components/ui/apple-cards-carousel'

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='mb-4 rounded-3xl bg-[#F5F5F7] p-8 dark:bg-neutral-800 md:p-14'
          >
            <p className='mx-auto max-w-3xl font-sans text-base text-neutral-600 dark:text-neutral-400 md:text-2xl'>
              <span className='font-bold text-neutral-700 dark:text-neutral-200'>
                The first rule of Apple club is that you boast about Apple club.
              </span>{' '}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src='https://assets.aceternity.com/macbook.png'
              alt='Macbook mockup from Aceternity UI'
              height='500'
              width='500'
              className='mx-auto h-full w-full object-contain md:h-1/2 md:w-1/2'
            />
          </div>
        )
      })}
    </>
  )
}

const data = [
  {
    category: 'Electricidad',
    title: 'Electricista Profesional a domicilio',
    src: 'https://images.unsplash.com/photo-1665242043190-0ef29390d289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3RyaWNpc3RhfGVufDB8fDB8fHwy',
    content: <DummyContent />
  },
  {
    category: 'Techista',
    title: 'Techista especializado',
    src: 'https://images.unsplash.com/photo-1683294494519-b3097c3ddd4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNpc3RhfGVufDB8fDB8fHwy',
    content: <DummyContent />
  },
  {
    category: 'Soldador',
    title: 'Soldador TIG Profesional',
    src: 'https://images.unsplash.com/photo-1622757665276-e52e2bfb2bea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3RyaWNpc3RhfGVufDB8fDB8fHwy',
    content: <DummyContent />
  },

  {
    category: 'Paneles Solares',
    title: 'Instalación de Paneles Solares Profesionales',
    src: 'https://images.unsplash.com/photo-1712669622011-0634303f5b3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVsZWN0cmljaXN0YXxlbnwwfHwwfHx8Mg%3D%3D',
    content: <DummyContent />
  },
  {
    category: 'Carpintería',
    title: 'Carpintería Profesional',
    src: 'https://images.unsplash.com/photo-1646640345481-81d36b291b39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVsZWN0cmljaXN0YXxlbnwwfHwwfHx8Mg%3D%3D',
    content: <DummyContent />
  },
  {
    category: 'Albanil',
    title: 'Albanil Profesional',
    src: 'https://images.unsplash.com/photo-1665242013108-17dfaa492f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGVsZWN0cmljaXN0YXxlbnwwfHwwfHx8Mg%3D%3D',
    content: <DummyContent />
  }
]

export function HeroSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <div className='h-full w-full flex items-center flex-col justify-center'>
      <div className='py-10'>
        <h2 className='relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent dark:from-neutral-600 dark:to-white md:py-10 lg:text-7xl'>
          Arreglalo Ya! <br /> Servicios Profesionales
        </h2>
        <p className='mx-auto max-w-xl text-center text-sm text-neutral-700 dark:text-neutral-400 md:text-lg'>
          Encuentra los mejores profesionales para tus necesidades. Desde plomería hasta electricidad, 
          pasando por carpintería y más. Servicios de calidad cuando los necesitas.
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  )
}
