const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReplaceSmartyPlugin = require('./ReplaceSmartyPlugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    }),
    new ReplaceSmartyPlugin({
      replaceRules: {
        '{##race_resource_url##}': '//cdn-res.esmatch.cn/resource/'
      }
    })
  ]
}
