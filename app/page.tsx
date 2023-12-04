import Link from 'next/link'
import Image from 'next/image'
import { Key, ReactElement, JSXElementConstructor, ReactNode, PromiseLikeOfReactNode } from 'react'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

import { BsPlayFill, BsArrowRightShort } from 'react-icons/bs'

export default async function Home() {
  const topRated = await moviedb.listInfo(634)
  const nowPlaying = await moviedb.moviePopular()
  const showcase = await moviedb.listInfo(8275882)
  const showcaseMovie = showcase.items[Math.floor(Math.random() * showcase.items.length)]

  return (
    <div className="-mt-20">
      <div className="relative">
        <Image className='w-screen h-[90vh] object-cover object-top' src={'https://image.tmdb.org/t/p/original/' + showcaseMovie.backdrop_path} alt={showcaseMovie.title} width={1920} height={1080} loading='lazy' />
        <div className="absolute h-[90vh] inset-0 bg-gradient-to-t from-white dark:from-stone-950 via-transparent"></div>
        <div className="absolute bottom-10 w-96 text-center left-1/2 -translate-x-1/2">
          <h1 className='text-5xl font-bold dark:text-shadow'>{showcaseMovie.title}</h1>
          <p className='dark:text-shadow line-clamp-3 my-2'>{showcaseMovie.overview}</p>
          <div className="flex flex-row gap-3 my-3 items-center justify-center">
            <Link href={'movies/' + showcaseMovie.id}>
              <button className="bg-white rounded-full border-grey-darkest px-6 py-3 font-sans text-black font-medium flex items-center hover: transition" ><BsPlayFill size="1.3rem"/>Se film</button>
            </Link>
            <Link href={'movies/' + showcaseMovie.id}>
              <button className="border rounded-full border-grey-darkest px-6 py-3 font-sans text-white font-medium flex items-center hover:bg-white hover:border-white hover:text-black transition">Vis mer <BsArrowRightShort size="1.3rem"/></button>
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mx-8 my-4">IMDb Top 250</h1>
      <div className="grid grid-rows-3 lg:grid-rows-2  grid-flow-col gap-4 mx-6 mt-4">
        {topRated.items.slice(0, 6).map((movie: { id: Key; backdrop_path: string; title: string }) => (
          <div className="flex flex-col group" key={movie.id}>
            <Link className='relative w-full aspect-video' href={'movies/' + movie.id} key={movie.id} prefetch={false}>
              <Image className='rounded-xl object-cover group-hover:opacity-60 transition' src={'https://image.tmdb.org/t/p/original/' + movie.backdrop_path} alt={movie.title} width={1920} height={1080} loading='lazy' />
              <div className="absolute top-3/4 w-full h-full text-center flex flex-col items-center overflow-hidden">
                <h1 className='text-l md:text-2xl font-bold dark:text-shadow transition'>{movie.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}