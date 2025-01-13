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
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-full transition-all duration-300 z-50 ${isScrolled ? 'bg-gray-700/90  backdrop-blur-sm ' : 'bg-transparent'}`}
      animate={{ backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
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
          <li className='font-serif text-lg font-bold hover:scale-105 transition-all duration-300'>
            <Link href='/'>Arreglalo Ya.</Link>
          </li>
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />
          <SignedIn>
            <UserButton />
            <ul className='hidden items-center gap-14 text-sm font-medium sm:flex'>
              <li className='font-bold'>
                <Link href='/profile'>Profile</Link>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </motion.header>
  )
}
