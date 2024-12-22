import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Next Shadcn Template',
  description: 'NextJs template with shadcn/ui'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='scroll-smooth' suppressHydrationWarning>
        <body
          className={cn(
            'flex min-h-screen flex-col',
            poppins.variable
          )}
        >
          <Providers>
            <Header />
            <main className='grow'>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
