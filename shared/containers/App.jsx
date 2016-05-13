import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import 'normalize.css'
import '../../static/css/app.css'

class App extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    return this.props.children
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default connect()(App)
