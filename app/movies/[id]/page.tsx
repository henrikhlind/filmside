import Link from 'next/link'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

const MoviePage = async ({ params }) => {
    const movie = await moviedb.movieInfo(params.id)
    const credits  = await moviedb.movieCredits(params.id)
    const videos = await moviedb.movieVideos(params.id)

    return (
        <div className='m-8'>
            {/* <img className='w-full object-cover object-center' src={'https://image.tmdb.org/t/p/original/' + movie.backdrop_path} alt={movie.title} /> */}
            <iframe className='w-full aspect-video pb-6' src={"https://www.youtube.com/embed/" + videos.results.filter(({type})=> type ==='Trailer')[0].key} title="YouTube video player" frameborder="0"></iframe>
            <h1 className='text-xl font-bold'>{movie.title}</h1>
            <em>{credits.crew.filter(({job})=> job ==='Director')[0].name}</em>
            <p className='w-1/3'>{movie.overview}</p>
        </div>
    )
}

export default MoviePage