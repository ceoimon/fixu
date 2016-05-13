import * as ActionTypes from '../constants/ActionTypes'

const initialState = { genres: [] }

const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_GENRES:
      return {
        genres: action.genres
      }
    default:
      return state
  }
}

export default genreReducer
