import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  movies: [],
  selectedMovie: null,
  genres: [],
  currentPageLastMovie: null
}

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MOVIE:
      return {
        ...state,
        movies: [{
          title: action.title,
          director: action.director,
          imdb: action.imdb,
          genres: action.genres,
          duration: action.duration,
          year: action.year,
          stars: action.stars,
          doubanScore: action.doubanScore,
          tomatoes: action.tomatoes,
          cuid: action.cuid,
          _id: action._id
        }, ...state.movies]
      }
    case ActionTypes.SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: action.movie
      }
    case ActionTypes.GET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        currentPageLastMovie: action.currentPageLastMovie
      }
    case ActionTypes.APPEND_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.movies],
        currentPageLastMovie: action.currentPageLastMovie
      }
    case ActionTypes.APPEND_GENRES:
      let _genres = state.genres
      action.genres.forEach((genre) => {
        if (_genres.indexOf(genre) === -1) _genres.push(genre)
      })
      return {
        ...state,
        genres: _genres
      }
    default:
      return state
  }
}

export default movieReducer
