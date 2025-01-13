import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Next + Clerk + Neon',
  description: 'NextJs template with Clerk and Neon'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' className='scroll-smooth' suppressHydrationWarning>
        <body className={cn('flex min-h-screen flex-col', poppins.variable)}>
          <Providers>
            <div className='pb-20'>
              <Header />
            </div>
            <main className='grow'>{children}</main>
            <Toaster />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
