import Link from 'next/link'
import Image from 'next/image'
import { Key, ReactElement, JSXElementConstructor, ReactNode, PromiseLikeOfReactNode } from 'react'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

export default async function MoviePage() {
    const nowPlaying = await moviedb.moviePopular()
    
    return (
        <div className="mt-9">
            <h1 className="text-2xl font-bold mx-8 my-4">På kino nå</h1>
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 mx-6 my-4">
                {nowPlaying.results.slice(0, 30).map((movie: { id: Key; backdrop_path: string; title: string }) => (
                    <div className="flex flex-col group" key={movie.id}>
                        <Link className='relative w-full aspect-video' href={'movies/' + movie.id} prefetch={false}>
                            <Image className='rounded-xl object-cover group-hover:opacity-60 transition' src={'https://image.tmdb.org/t/p/original/' + movie.backdrop_path} alt={movie.title} width={1920} height={1080} loading='lazy' />
                            <div className="absolute top-3/4 w-full h-full text-center flex flex-col items-center overflow-hidden">
                                <h1 className='text-xl md:text-2xl font-bold text-shadow transition'>{movie.title}</h1>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}