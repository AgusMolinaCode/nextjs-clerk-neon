'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const variants = {
    top: {
      maxWidth: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    scrolled: {
      maxWidth: '64rem',
      backgroundColor: 'rgba(0, 0, 0)',
      transition: {
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-black mt-2 rounded-lg' : 'bg-transparent'}`}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={variants}
      style={{
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      <nav className='container flex items-center justify-between py-6'>
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left'>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='font-sans text-2xl'>
                <SheetClose asChild>
                  <Link href='/'>Arreglalo Ya.</Link>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
          <li className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'} font-serif text-lg font-bold hover:scale-105 transition-all duration-300`}>
            <Link href='/'>Arreglalo Ya.</Link>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle 
            sunClassName={isScrolled ? 'text-orange-300' : 'text-orange-300'} 
            moonClassName={isScrolled ? 'text-gray-200' : 'text-gray-800'} 
          />
          <SignedIn>
            <UserButton />
            <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
              <li className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'}`}>
                <Link href='/profile'>Profile</Link>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'}`}>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </motion.header>
  )
}
