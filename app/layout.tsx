'use client'

import './globals.css'

import Link from 'next/link'
import Head from 'next/head'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BsSearch } from 'react-icons/bs'

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';


const slug = require('slug')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalState, setModalState] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(query)

    router.push(`/search/${slug(query)}`);

    setModalState(false)
    setQuery('')
  };


  return (
    <html lang="en" className='scroll-smooth'>
      <Head>
        <title>Filmside</title>
      </Head>
      <body className='font-sans bg-slate-50 text-bg-stone-950 dark:bg-stone-950 dark:text-slate-50 font-light'>
        <header className='text-bg-stone-950 dark:text-slate-50 sticky flex items-center w-screen top-0 p-4 z-10'>
          <div className="w-1/3 inline-flex items-center gap-4">
            <p className='text-xl dark:text-shadow'><Link href='/movies'>filmer</Link></p>
            <p className='text-xl dark:text-shadow'><Link href='/genres'>sjangere</Link></p>
            <p className='text-xl dark:text-shadow'><Link href='/ui'>ui</Link></p>
          </div>
          <div className="w-1/3 flex justify-center">
            <h1 className='text-3xl font-semibold dark:text-shadow'><Link href='/'>filmside</Link></h1>
          </div>
          <div className="w-1/3 flex justify-end">
            <p onClick={(() => setModalState(true))} className='cursor-pointer'>
              <BsSearch className="dark:text-shadow" size="1.3rem" />
            </p>
          </div>
        </header>
        <div className="relative z-0">
          {children}
            <Analytics />
            <SpeedInsights />
        </div>

        {modalState && (
          <div className="fixed top-0 w-screen h-screen bg-slate-950/50 flex items-center justify-center" >
            <div className="w-full h-full z-0 fixed" onClick={() => setModalState(false)}></div>
            <div className="dark:bg-slate-950/20 border-2 border-slate-50/10 backdrop-blur-md p-4 rounded-lg inline-flex justify-center items-center">
              <BsSearch className="dark:text-shadow" size="1rem" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Søk..."
                  className="p-2 w-44 md:w-96 dark:text-slate-50 focus:outline-none bg-transparent"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </body>
    </html>
  )
}
