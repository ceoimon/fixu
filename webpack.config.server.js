module.exports = function (env) {
  var config = env === 'production' ? require('./webpack.config.prod')() : require('./webpack.config.dev')()
  config.entry = [
    'webpack-hot-middleware/client',
    './server/server.js'
  ]
  config.target = 'node'
  config.output.filename = 'server.bundle.js'
  config.output.path = __dirname + '/server/dist'
  config.output.publicPath = '/server/dist'
  config.output.libraryTarget = 'commonjs2'
  config.plugins.splice(1, 1)
  return config
}
