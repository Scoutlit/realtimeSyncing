var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
					plugins: [
						"transform-decorators-legacy"
					],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  devServer: {
    port: 8484
  }
}
