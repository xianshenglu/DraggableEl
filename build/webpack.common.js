const path = require('path')

module.exports = {
  entry: './src/index',
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src/')
  //   }
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'DraggableEl.min.js'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: require.resolve('../src/index'),
        loader: 'expose-loader',
        options: 'DraggableEl'
      }
    ]
  }
}
