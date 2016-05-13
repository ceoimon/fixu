import movies from './movie.reducer'
import genres from './genre.reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  movies,
  genres
})

export default rootReducer
