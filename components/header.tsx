'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Menu, UserIcon } from 'lucide-react'
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)',
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full px-4 ${isScrolled ? 'mt-2 rounded-lg border border-gray-800 bg-black/20' : 'bg-transparent'}`}
      initial='top'
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={variants}
      style={{
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      <nav className='container flex items-center justify-between py-2'>
        
        <Sheet>
          <SheetTrigger className='sm:hidden'>
            <Menu
              className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'} h-6 w-6`}
            />
          </SheetTrigger>

          <SheetContent side='left'>
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <ul className='flex flex-col gap-3 text-sm'>
              <li className='flex flex-col font-sans text-2xl'>
                <SheetClose asChild>
                  <Link className='font-sans text-2xl' href='/'>
                    Arreglalo Ya.
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <div className='flex items-center gap-2 pt-6'>
                    <UserIcon className='h-6 w-6' />
                    <Link className='font-sans text-xl' href='/profile'>
                      Profile
                    </Link>
                  </div>
                </SheetClose>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
          <li
            className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'} text-lg font-bold transition-all duration-300 hover:scale-105`}
          >
            <Link href='/'>Arreglalo Ya.</Link>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle
            sunClassName={isScrolled ? 'text-orange-300' : 'text-orange-300'}
            moonClassName={isScrolled ? 'text-gray-100' : 'text-gray-800'}
          />
          <SignedIn>
            <UserButton />
            <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
              <li
                className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'}`}
              >
                <Link href='/profile'>Profile</Link>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button
                className={`${isScrolled ? 'text-white dark:text-white' : 'text-black dark:text-white'}`}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </motion.header>
  )
}
