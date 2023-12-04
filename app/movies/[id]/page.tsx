import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

import { BsArrowDown, BsDot } from 'react-icons/bs'
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

const MoviePage = async ({ params }: { params: any }) => {
    const movie = await moviedb.movieInfo(params.id)
    const credits  = await moviedb.movieCredits(params.id)
    const images = await moviedb.movieImages(params.id)
    const recommendations = await moviedb.movieSimilar(params.id)
    const providers  = await moviedb.movieWatchProviders(params.id)

    return (
        <div className='-mt-[9vh]'>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <div className="relative w-full h-full">
                <Image className='w-screen h-screen overflow-hidden object-cover' src={'https://image.tmdb.org/t/p/original/' + images.backdrops[0].file_path} alt={movie.title} width={1920} height={1080} loading='lazy' />
                <div className="absolute h-screen inset-0 bg-gradient-to-t from-white dark:from-stone-950 via-transparent"></div>
                <div className="absolute bottom-10 text-center w-full">
                    <div className="flex flex-col justify-center items-center">
                        <div className="inline-flex justify-center gap-2">
                            {movie.genres.map((genre: { name: string; }, index: Key) => (
                                <p className='text-2xl opacity-80 inline-flex justify-center items-center' key={index}>{genre.name}{index != movie.genres.length-1 ? (< BsDot/>) : null}</p>
                            ))}
                        </div>
                        <h1 className='text-5xl md:text-7xl font-bold dark:text-shadow'>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                        <h1 className='text-xl md:text-2xl dark:text-shadow'>{movie.tagline ? (movie.tagline) : null}</h1>
                        
                       <a href='#desc' className='text-lg mt-5'><BsArrowDown className='text-2xl'/></a>
                    </div>
                </div>
            </div>
            <div className='h-96 w-screen flex' id='desc'>
                <div className="w-1/3 p-4">
                    <h1 className='text-4xl font-bold mb-2'>Les mer</h1>
                    <h1 className='text-xl md:text-2xl dark:text-shadow'>{movie.overview}</h1>
                    {/* <div className="my-3">
                        {providers.results.NO ? (
                        <div className="hidden md:flex gap-2 w-fit p-2 bg-gray-950 bg-opacity-25 rounded-lg backdrop-blur-lg my-1">
                            {providers.results.NO.flatrate ? (
                                <div className="">
                                    <p className='text-xl font-semibold'>Streaming</p>
                                    <div className="flex flex-row justify-center providers">
                                        {providers.results.NO.flatrate.map((provider: { provider_name: string; provider_id: Key; logo_path: string }) => (
                                            <Link href={providerUrls[provider.provider_name]} target='_blank' key={provider.provider_id}>
                                                <Image className='w-6 md:w-9 m-1 rounded-lg provider transition-opacity' src={'https://image.tmdb.org/t/p/original' + provider.logo_path} alt="" width={1920} height={1080} loading='lazy' />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            {providers.results.NO.flatrate && providers.results.NO.free || providers.results.NO.flatrate && providers.results.NO.rent ? (
                                <div className="border-r-2 border-gray-900/25 rounded-sm h-10 self-center"></div>
                            ) : null}
                            {providers.results.NO.free ? (
                                <div className="">
                                    <p className='text-xl font-semibold'>Gratis</p>
                                    <div className="flex flex-row justify-center providers">
                                        {providers.results.NO.free.map((provider) => (
                                            <Link href={providerUrls[provider.provider_name]} target='_blank' key={provider.provider_id}>
                                                <Image className='w-6 md:w-9 m-1 rounded-lg provider transition-opacity' src={'https://image.tmdb.org/t/p/original' + provider.logo_path} alt="" width={1920} height={1080} loading='lazy' />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            {providers.results.NO.free && providers.results.NO.rent ? (
                                <div className="border-r-2 border-gray-900/25 rounded-sm h-10 self-center"></div>
                            ) : null}
                            {providers.results.NO.rent ? (
                                <div className="">
                                    <p className='text-xl font-semibold'>Leie</p>
                                    <div className="flex flex-row justify-center providers">
                                        {providers.results.NO.rent.map((provider) => (
                                            <Link href={providerUrls[provider.provider_name]} target='_blank' key={provider.provider_id}>
                                                <Image className='w-6 md:w-9 m-1 rounded-lg provider transition-opacity' src={'https://image.tmdb.org/t/p/original' + provider.logo_path} alt="" width={1920} height={1080} loading='lazy' />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            {providers.results.NO.rent && providers.results.NO.buy ? (
                                <div className="border-r-2 border-gray-900/25 rounded-sm h-10 self-center"></div>
                            ) : null}
                            {providers.results.NO.buy ? (
                                <div className="">
                                    <p className='text-xl font-semibold'>Kjøp</p>
                                <div className="flex flex-row justify-center providers">
                                        {providers.results.NO.buy.map((provider) => (
                                            <Link href={providerUrls[provider.provider_name]} target='_blank' key={provider.provider_id}>
                                                <img className='w-6 md:w-9 m-1 rounded-lg provider transition-opacity' src={'https://image.tmdb.org/t/p/original' + provider.logo_path} alt="" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        ) : null}
                    </div> */}
                </div>
                <div className="w-2/3 p-4">
                    <h1 className='text-4xl font-bold mb-2'>Lignende filmer</h1>
                    <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-hidden">
                        {recommendations.results.filter(
                            (poster_path: any, backdrop_path: any) => 
                                poster_path && backdrop_path
                        ).slice(0, 6).map((movie: { id: Key; backdrop_path: string; title: string }) => (
                            <div className="flex flex-col group" key={movie.id}>
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

export default MoviePage