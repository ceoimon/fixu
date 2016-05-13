import React, { PropTypes } from 'react'
import styles from './movieCard.css'

function MovieCard ({ movie }) {
  const {
    movie_card,
      poster,
      caption,
        title,
        genres,
          genre,
            genre_link,
        score
  } = styles

  const genresElement = (
    <ul
      className={genres}
    >
      {
        (movie.genres)
        ? movie.genres.map((movieGenre, i) => {
          return (
            <li key={i} className={genre} >
              <a href='#' className={genre_link} >
                {movieGenre.name}
              </a>
            </li>
          )
        })
        : null
      }
    </ul>
  )
  const titleElement = (
    <h4 className={title} >
      <a href='#' title={movie.title} >
        {movie.title}
      </a>
    </h4>
  )
  const scoreElement = (
    <span className={score} >
      {movie.imdb.score.toFixed(1)}
    </span>
  )

  return (
    <div
      className={movie_card}
    >
      <div
        className={poster}
        style={{
          backgroundImage: `url(/img/poster/full/${movie.imdb.id}.jpg)`
        }}
      >
      </div>
      <div
        className={caption}
      >
        {titleElement}
        {genresElement}
        {scoreElement}
      </div>
    </div>
  )
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired
  }).isRequired
}

export default MovieCard
