const webpackCommon = require('./webpack.common')
let path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const prodConfig = Object.assign(webpackCommon, {
  mode: 'production'
})
prodConfig.plugins = webpackCommon.plugins.concat([
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../')
  })
])
module.exports = prodConfig
