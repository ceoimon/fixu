import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import IconMenu from '../components/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list'// import Actions from '../redux/actions/actions'

class MoviesFilter extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      valueMultiple: ['ALL', 'Drama']
    }
    this.handleFilterChange = this.props.handleFilterChange.bind(this)
  }

  render () {
    return (
      <div className='movie-filter-container'>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <ContentFilter />
            </IconButton>
          }
          value={this.state.valueMultiple}
          onChange={this.handleFilterChange}
          multiple={true}
          maxHeight={300}
          closeOnItemTouchTap={false}
          menuClassName='genre-filter'
        >
          <MenuItem value='ALL' primaryText='ALL' />
          {this.props.genres.map((genre, i) => (
            <MenuItem
              value={genre.name}
              primaryText={genre.name}
              key={i}
              className='filter-item'
            />
          ))}
        </IconMenu>
      </div>
    )
  }
}

MoviesFilter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    handleFilterChange (event, value) {
      this.setState({
        valueMultiple: value
      })
      // dispatch(Actions.genreActions.changeMoviesFilter())
    }
  }
}

export default connect(mapDispatchToProps)(MoviesFilter)
