import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'

import VariableFontHoverByLetter from '@/components/fancy/variable-font-hover-by-letter'

import { Menu } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className='mb-4 py-6 lg:mb-10'>
      <nav className='container flex items-center justify-between'>
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
          <li className='font-serif text-lg font-bold'>
            <Link href='/'>Arreglalo Ya.</Link>
          </li>
        </ul>

        <VariableFontHoverByLetter
          label='Arreglalo Ya.'
          staggerDuration={0.03}
          fromFontVariationSettings="'wght' 400, 'slnt' 0"
          toFontVariationSettings="'wght' 900, 'slnt' -10"
        />

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
    </header>
  )
}
