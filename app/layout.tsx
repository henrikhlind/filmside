import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { BsSearch } from 'react-icons/bs'

export const metadata: Metadata = {
  title: 'Filmside',
  description: 'Liste over filmer, med informasjon på egen dynamic route.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className='font-sans bg-white text-bg-stone-950 dark:bg-stone-950 dark:text-white font-light'>
        <header className='text-bg-stone-950 dark:text-white sticky flex items-center w-screen top-0 p-4 z-10'>
          <div className="w-1/3 inline-flex items-center gap-4">
            <p className='text-xl text-shadow'><Link href='/movies'>filmer</Link></p>
            <p className='text-xl text-shadow'><Link href='/ui'>ui</Link></p>
          </div>
          <div className="w-1/3 flex justify-center">
            <h1 className='text-3xl font-semibold text-shadow'><Link href='/'>filmside</Link></h1>
          </div>
          <div className="w-1/3 flex justify-end">
            <p><Link href='/'><BsSearch className="text-shadow" size="1.3rem"/></Link></p>
          </div>
        </header>
        <div className="relative z-0">
          {children}
        </div>
        </body>
    </html>
  )
}
