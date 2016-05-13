var webpack = require('webpack')
module.exports = function () {
  var config = require('./webpack.config.default')
  config.devtool = 'source-map'
  config.ouput.filename = '[chunkhash].bundle.js'
  config.plugins.splice(0, 1,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  )
  config.plugins.push(new webpack.optimiza.UglifyJsPlugin({
    minimize: true,
    compressor: {
      warnings: false
    }
  }))
  return config
}
