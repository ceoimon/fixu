import React from 'react'
import routes from '../shared/config/routes'
import DevTools from '../shared/containers/DevTools'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { configureStore } from '../shared/redux/store/configureStore'
import getMaterialTheme from '../shared/getMaterialTheme'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Use react-tap-event-plugin for material-ui
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

import { MuiThemeProvider } from 'material-ui/styles'

const muiTheme = getMaterialTheme({})

const store = configureStore(window.__INITIAL_STATE__)
const history = browserHistory
const dest = document.getElementById('root')

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }
}

if (process.env.CLIENT && !window.devToolsExtension) {
  render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    </MuiThemeProvider>,
    dest
  )
}
