var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  	new webpack.optimize.UglifyJsPlugin({
  		compressor: {
        warnings: false,
      },
  	}),
  	new webpack.optimize.OccurrenceOrderPlugin(),
  	new HtmlWebpackPlugin({
      template: './template/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
};
