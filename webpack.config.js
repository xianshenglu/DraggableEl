const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'DraggableEl.min.js'
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  module: {
    rules: [
      {
        test: require.resolve('./src/index'),
        loader: 'expose-loader',
        options: 'DraggableEl'
      }
    ]
  }
}
