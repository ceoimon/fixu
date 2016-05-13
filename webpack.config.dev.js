var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var StatsPlugin = require('stats-webpack-plugin')
var path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /static/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]')
      },
      {
        test: /\.css$/,
        include: /static/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[local]')
      },
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    }),
    // new StatsPlugin(path.join(__dirname, './dist', 'stats.json'), {
    //   chunkModules: true
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'ENV.browser': true }),
    new ExtractTextPlugin('./css/styles.css')
  ]
}
