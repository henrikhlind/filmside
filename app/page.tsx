import Link from 'next/link'

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_KEY)

export default async function Home() {
  const topRated = await moviedb.movieNowPlaying()
  const showcase = await moviedb.listInfo(8275882)
  const showcaseMovie = showcase.items[Math.floor(Math.random() * showcase.items.length)]

  return (
    <div className="-mt-56">
      <div className="relative">
        <Link className='w-full mix-blend-overlay' href={'movies/' + showcaseMovie.id} key={showcaseMovie.id}>
          <div className="bg-gradient-to-b from-black w-full"></div>
          <img className='w-screen' src={'https://image.tmdb.org/t/p/original/' + showcaseMovie.backdrop_path}/>
        </Link>
      <div className="absolute ml-6 bottom-5 w-96 line-clamp-4">
        <h1 className='text-xl font-bold text-shadow'>{showcaseMovie.title}</h1>
          <em className='text-shadow'>{showcaseMovie.overview}</em>
      </div>
      </div>
      <div className="flex">
        {topRated.results.slice(0, 14).map((movie) => (
          <Link className='w-full' href={'movies/' + movie.id} key={movie.id} prefetch={false}>
            <img className='' src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}/>
          </Link>
        ))}
      </div>
    </div>
  );
}
