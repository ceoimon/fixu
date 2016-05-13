import expect from 'expect'
import movieReducer from '../redux/reducers/movie.reducer'
import deepFreeze from 'deep-freeze'
import * as ActionTypes from '../redux/constants/ActionTypes'

const dummyData = {
  title: 'The Shawshank Redemption',
  director: ['Frank Darabont'],
  genres: [
    'Crime',
    'Drama'
  ],
  duration: '142 min',
  imdb: {
    id: 'tt0111161',
    score: '9.3',
    rank: '1'
  },
  year: '1994',
  stars: [
    'Tim Robbins',
    'Morgan Freeman',
    'Bob Gunton'
  ],
  doubanScore: '9.6',
  tomatoes: [
    '91',
    '93'
  ],
  cuid: null,
  _id: null
}

describe('Reducers tests:', () => {
  it('Action ADD_MOVIE is working.', () => {
    const stateBefore = {
      movies: ['foo'],
      selectedMovie: null
    }
    const stateAfter = {
      movies: [dummyData, 'foo'],
      selectedMovie: null
    }

    const action = {
      type: ActionTypes.ADD_MOVIE,
      ...dummyData
    }
    // const action = Object.assign({}, dummyData, {type: ActionTypes.ADD_MOVIE})
    deepFreeze(stateBefore)
    deepFreeze(action)
    expect(stateAfter).toEqual(movieReducer(stateBefore, action))
  })
  it('Action SELECTED_MOVIE is working.', () => {
    const stateBefore = {
      movies: [dummyData, 'foo'],
      selectedMovie: null
    }
    const stateAfter = {
      movies: [dummyData, 'foo'],
      selectedMovie: dummyData
    }
    const action = {
      type: 'SELECTED_MOVIE',
      movie: dummyData
    }

    deepFreeze(stateBefore)
    deepFreeze(action)
    expect(stateAfter).toEqual(movieReducer(stateBefore, action))
  })
  it('Action GET_MOVIES is working.', () => {
    const stateBefore = {
      movies: [],
      selectedMovie: null
    }
    const stateAfter = {
      movies: [dummyData],
      selectedMovie: null
    }
    const action = {
      type: 'GET_MOVIES',
      movies: [dummyData]
    }

    deepFreeze(stateBefore)
    deepFreeze(action)
    expect(stateAfter).toEqual(movieReducer(stateBefore, action))
  })
})
