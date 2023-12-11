import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

import { BsArrowDown, BsDot, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { Key } from 'react';

const providerUrls = {
  'Viaplay': 'https://www.viaplay.no',
  'Apple TV': 'http://tv.apple.com/no',
  'Google Play Movies': 'https://play.google.com/store/movies',
  'Microsoft Store': 'https://www.microsoft.com/store/movies-and-tv',
  'Rakuten TV': 'https://www.rakuten.tv',
  'Blockbuster': 'https://www.blockbuster.no',
  'SF Anytime': 'https://www.sfanytime.no',
  'TV 2 Play': 'https://play.tv2.no/',
  'Prime Video': 'https://www.primevideo.com',
  'Amazon Prime Video': 'https://www.primevideo.com',
  'Netflix': 'https://www.netflix.com',
  'HBO Max': 'https://www.hbomax.com',
  'HBO': 'https://www.hbomax.com',
  'Filmoteket': 'https://www.filmotekt.no',
  'Strim': 'https://www.strim.no',
  'Disney Plus': 'https://www.disneyplus.com',
  'MUBI': 'https://mubi.com',
  'SkyShowtime': 'https://www.skyshowtime.com/'
};

export default async function MoviePage ({ params }: { params: any }) {
    const movie = await moviedb.movieInfo(params.id)
    const credits  = await moviedb.movieCredits(params.id)
    const images = await moviedb.movieImages(params.id)
    const recommendations = await moviedb.movieSimilar(params.id)

    return (
        <div className='-mt-[9vh]'>
            <Head>
                <title>dsaudas</title>
            </Head>
            <div className="relative w-full h-full">
                <Image className='w-screen h-screen overflow-hidden object-cover' src={'https://image.tmdb.org/t/p/original/' + images.backdrops[0].file_path} alt={movie.title} width={1920} height={1080} loading='lazy' />
                <div className="absolute h-screen inset-0 bg-gradient-to-t from-slate-50 dark:from-stone-950 via-transparent"></div>
                <div className="absolute bottom-10 text-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className="inline-flex justify-center gap-2">
                            {movie.genres.map((genre: { name: string; id: number}, index: Key) => (
                                <Link className='text-2xl opacity-80 inline-flex justify-center items-center hover:opacity-100' href={'/genres/' + genre.id} key={index}>{genre.name}{index != movie.genres.length-1 ? (< BsDot/>) : null}</Link>
                            ))}
                        </div>
                        <p className='text-2xl opacity-80 inline-flex justify-center items-center' ></p>
                        <h1 className='text-5xl md:text-7xl font-bold dark:text-shadow'>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                        <h1 className='text-xl md:text-2xl dark:text-shadow'>{movie.tagline ? (movie.tagline) : null}</h1>
                        
                       <a href='#desc' className='text-lg mt-5'><BsArrowDown className='text-2xl'/></a>
                    </div>
                </div>
            </div>
            <div className='h-96 w-screen flex' id='desc'>
                <div className="w-full p-5">
                    <h1 className='text-4xl font-bold m-4'>Lignende filmer</h1>
                    <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-hidden snap-mandatory snap-x">
                        <div className="absolute w-10 h-72 right-10 z-10 flex justify-center items-center">
                            < BsChevronRight className="bg-slate-950/10 rounded-full h-8 w-8 backdrop-blur-sm" />
                        </div>
                        {recommendations.results
                          .filter((movie: { vote_count: number; backdrop_path: null }) => movie.vote_count >= 10 && movie.backdrop_path !== null)
                          .sort((a: { vote_average: number }, b: { vote_average: number }) => b.vote_average - a.vote_average)
                          .slice(0, 6)
                          .map((movie: { id: Key; backdrop_path: string; title: string }) => (
                            <div className="flex flex-col group snap-end" key={movie.id}>
                                <Link className='relative h-72 aspect-video' href={'' + movie.id} prefetch={false}>
                                    <Image className='rounded-xl object-cover group-hover:opacity-60 transition' src={'https://image.tmdb.org/t/p/original/' + movie.backdrop_path} alt={movie.title} width={1920} height={1080} loading='lazy' />
                                    <div className="absolute top-3/4 w-full h-full text-center flex flex-col items-center overflow-hidden">
                                        <h1 className='text-xl md:text-2xl font-bold dark:text-shadow transition'>{movie.title}</h1>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link className='absolute w-10 h-10 left-10 bottom-10' href={'https://fmoviesz.to/filter?keyword=' + movie.title.replace(/\s/g, '+')} target='_blank'></Link>
        </div>
    )
}