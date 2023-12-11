import Link from 'next/link'
import Image from 'next/image'
import { Key } from 'react'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

export default async function GenrePage({ params }: { params: any }) {
    const movies = await moviedb.discoverMovie()
    const genres = await moviedb.genreMovieList()

    return (
        <div className="mt-9">
            <h1 className="text-2xl font-bold mx-8 my-4">Sjangere</h1>
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-4 mx-6 my-4">
                {genres.genres.slice(0, 30).map((genre: { id: Key; backdrop_path: string; name: string }) => (
                    <div className="flex flex-col group" key={genre.id}>
                        <Link className='relative w-full aspect-video' href={'/genres/' + genre.id} prefetch={false}>
                            {/* <Image className='rounded-xl object-cover group-hover:opacity-60 transition' src={'https://image.tmdb.org/t/p/original/' + genre.backdrop_path} alt={movie.title} width={1920} height={1080} loading='lazy' /> */}
                            <div className="absolute top-3/4 w-full h-min text-center flex flex-col items-center overflow-hidden">
                                <h1 className='text-lg md:text-xl font-bold text-shadow transition'>{genre.name}</h1>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}