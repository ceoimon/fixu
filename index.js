var webpack = require('webpack')
require('babel-core/register')
require('babel-polyfill')
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]-[hash:base64:5]'
})
require('./server/server')
// var config = require('./webpack.config.server')(process.NODE_ENV)
// var compiler = webpack(config)
// compiler.run(function (err, stats) {
//   if (!err) {
//     require('./server/dist/server.bundle.js')
//   }
// })
