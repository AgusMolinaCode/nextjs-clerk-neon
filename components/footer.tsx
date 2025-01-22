import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='pb-4 pt-4 md:pt-28'>
      <div className='container flex flex-col items-center justify-between gap-x-3 gap-y-1 text-center text-sm text-muted-foreground sm:flex-row'>
        <p>
          &copy;{new Date().getFullYear()}. All rights reserved.
        </p>
        <p className='text-xs'>
          Developed by{' '}
          <Link
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary transition-colors hover:text-accent-foreground'
            href='https://www.linkedin.com/in/agustin-molina-994635138/'
          >
            Agustin Molina
          </Link>
        </p>
      </div>
    </footer>
  )
}
