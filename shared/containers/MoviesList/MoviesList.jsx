import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import Actions from '../../redux/actions/actions'
import MovieCard from '../../components/MovieCard/movieCard'
import styles from './MoviesList.css'

class MoviesList extends Component {
  constructor () {
    super()
    this.state = {
      page: 1,
      isFull: false,
      isMannual: false,
      isUpdating: false
    }
    this._PERPAGE = 20
    this.MAX_AUTOUPDATE_PAGE = 5
    this._isFull = this._isFull.bind(this)
    this._fetchMovies = this._fetchMovies.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  _fetchMovies () {
    const _page = this.state.page + 1
    this.setState({
      isUpdating: true,
      page: _page
    })
    this.props.dispatch(Actions.movieActions.fetchMovies({
      page: _page,
      per_page: this._PERPAGE,
      _c: this.props.currentPageLastMovie
    }))
      .then(() => {
        this.setState({
          isUpdating: false
        })
        this._isFull()
      })
  }

  _isFull () {
    if ((this.props.currentPageLastMovie === null) && (this.state.page !== 1)) {
      this.setState({
        isFull: true
      })
    }
  }

  handleLoadMoreClick () {
    if (!this.state.isUpdating && !this.state.isFull) {
      this._fetchMovies()
    }
  }

  handleScroll () {
    const {
      page,
      isFull,
      isMannual,
      isUpdating
    } = this.state
    if (!isUpdating && !isMannual && !isFull) {
      if (page === this.MAX_AUTOUPDATE_PAGE) {
        this.throttled.cancel()
        this.element.removeEventListener('scroll', this.throttled)
        this.setState({
          isMannual: true
        })
      }
      let height = this.element.offsetHeight
      let scrollTop = this.element.scrollTop
      let scrollHeight = this.element.scrollHeight
      if (scrollTop + height > scrollHeight - 200) {
        this._fetchMovies()
      }
    }
  }

  componentDidMount () {
    this.throttled = throttle(this.handleScroll, 300)
    this.element.addEventListener('scroll', this.throttled)
    this.debounced = debounce(this.handleScroll, 300)
    window.addEventListener('resize', this.debounced)
  }

  componentWillUnmount () {
    this.throttled.cancel()
    this.element.removeEventListener('scroll', this.throttled)
    this.debounced.cancel()
    window.removeEventListener('resize', this.debounced)
  }

  render () {
    const {
      movies_list,
        load_more
    } = styles

    return (
      <div ref={(ref) => this.element = ref} className={movies_list}>
        {
          this.props.movies.map((movie, i) => (
            <MovieCard movie={movie} key={i} />
          ))
        }
        {
          this.state.isUpdating
            ? <button className={load_more}>Loading...</button>
            : null
        }
        {
          this.state.isMannual
            ? this.state.isFull
              ? null
              : <button className={load_more} onClick={this.handleLoadMoreClick}>Load more...</button>
            : null
        }
      </div>
    )
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.string.isRequired
  })).isRequired,
  currentPageLastMovie: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect()(MoviesList)
