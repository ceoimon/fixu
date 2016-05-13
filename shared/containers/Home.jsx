import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MoviesList from './MoviesList/MoviesList'
// import MoviesFilter from './MoviesFilter'
import Header from '../components/Header/header'
import Actions from '../redux/actions/actions'

class Home extends Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount () {
    if (this.props.movies.length === 0) {
      this.props.dispatch(Actions.movieActions.fetchMovies({}))
    }
  }

  render () {
    return (
      <div>
        <Header />
        {/* <MoviesFilter genres={this.props.genres} /> */}
        <MoviesList currentPageLastMovie={this.props.currentPageLastMovie} movies={this.props.movies} />
      </div>
    )
  }
}

Home.need = [
  () => {
    return Actions.movieActions.fetchMovies({})
  }
]

Home.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired
  })).isRequired,
  currentPageLastMovie: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    movies: state.movies.movies,
    genres: state.movies.genres,
    currentPageLastMovie: state.movies.currentPageLastMovie
  }
}

export default connect(mapStateToProps)(Home)
