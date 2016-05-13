import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : ''

export function appendGenres (genres) {
  return {
    type: ActionTypes.APPEND_GENRES,
    genres
  }
}

export function appendMovies (movies, perPage) {
  let currentPageLastMovie = null
  if (movies && movies.length !== 0) {
    if (perPage) {
      if (perPage > movies.length) currentPageLastMovie = null
    }
    currentPageLastMovie = movies[movies.length - 1]
  }
  return {
    type: ActionTypes.APPEND_MOVIES,
    movies,
    currentPageLastMovie
  }
}

export function fetchMovies ({
  page = 1,
  per_page = 20,
  _c
}) {
  return (dispatch) => {
    let queryStr = `?page=${page}&per_page=${per_page}`
    _c && (queryStr += `&q=${_c.imdb.rank},${_c.imdb.score}`)
    return fetch(`${baseURL}/api/Movies${queryStr}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(appendMovies(response.movies, per_page))
        dispatch(appendGenres(response.genres))
      })
  }
}

// export function filterMovies (movies, filters) {
//   if (filters === ['ALL']) {
//     return movies
//   }
//   const _movies = movies.filter((movie) => {
//     let remain = false
//     movie.genres.forEach((genre) => {
//       if (genre.name === filters) {
//         remain = true
//       }
//     })
//     return remain
//   })
//   getMovies(_movies)
// }
