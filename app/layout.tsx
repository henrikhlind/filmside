import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import { BsSearch } from 'react-icons/bs'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className='font-sans bg-stone-900 text-white font-light'>
        <header className='text-white p-4 sticky top-0 z-10 flex items-center justify-between'>
          <div className="flex gap-2">
            <p className='text-xl text-shadow'><Link href='/'>filmer</Link></p>
            <p className='text-xl text-shadow'><Link href='/ui'>ui</Link></p>
          </div>
          <div className="">
            <h1 className='text-3xl font-semibold text-shadow'><Link href='/'>filmside</Link></h1>
          </div>
          <div className="">
            <p className=''><Link href='/'><BsSearch className="text-shadow"/></Link></p>
          </div>
        </header>
        <div className="relative z-0">
          {children}
        </div>
        </body>
    </html>
  )
}
