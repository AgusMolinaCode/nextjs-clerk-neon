'use client'

import { motion, useInView } from 'framer-motion'
import * as React from 'react'

export const BlurIn = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.h2
      ref={ref}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className='text-center text-xl font-bold tracking-tighter sm:text-3xl md:text-4xl md:leading-[4rem]'
    >
      {children}
    </motion.h2>
  )
}
