import Express from 'express'
import serverConfig from './config/config'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import morgan from 'morgan'

// Webpack Requirements
import webpack from 'webpack'
import webpackConfig from '../webpack.config.dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// Initialize the Express App
const app = new Express()

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }))
  app.use(webpackHotMiddleware(compiler))

  // debug information
  app.use(morgan('tiny'))
  mongoose.set('debug', true)
}

// React And Redux Setup
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { configureStore } from '../shared/redux/store/configureStore'

// Import required modules
import routes from '../shared/config/routes'
import { fetchComponentData } from './utils/fetchData'
// API.
import movieAPIRoutes from './config/routes/movie.routes'
import genreAPIRoutes from './config/routes/genre.routes'
// Intial data.
import dummyData from './dummyData'
// Material UI.
import { MuiThemeProvider } from 'material-ui/styles'
import getMaterialTheme from '../shared/getMaterialTheme'

// MongoDB Connection
mongoose.Promise = global.Promise
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!') // eslint-disable-line no-console
    throw error
  }

  // feed some dummy data in DB.
  dummyData()
})

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(Express.static(path.resolve(__dirname, '../static')))
app.use('/api', movieAPIRoutes)
app.use('/api', genreAPIRoutes)

// Render Initial HTML
import render from './render'

// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) {
      return res.status(404).end('Not found!')
    }

    const initialState = {}
    const store = configureStore(initialState)

    const muiTheme = getMaterialTheme(req)

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          </MuiThemeProvider>
        )
        const finalState = store.getState()

        res.status(200).end(render(initialView, finalState))
      })
      .catch(() => {
        res.end(render('Error', {}))
      })
  })
})

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Fixu is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
})

export default app
