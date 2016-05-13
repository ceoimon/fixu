import * as ActionTypes from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : ''

export function getGenres (genres) {
  return {
    type: ActionTypes.GET_GENRES,
    genres
  }
}

export function fetchGenres () {
  return (dispatch) => {
    return fetch(`${baseURL}/api/Genres`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json()).then((response) => dispatch(getGenres(response.genres)))
  }
}
