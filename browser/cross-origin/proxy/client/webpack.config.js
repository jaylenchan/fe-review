const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    },
    contentBase: path.resolve(__dirname)
  }
}
