const webpack = require('webpack')
const webpackCommon = require('./webpack.common')
const devConfig = Object.assign(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  }
})
devConfig.plugins = webpackCommon.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
])
module.exports = devConfig
