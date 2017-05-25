const webpack = require('webpack');
const helpers = require('./helper');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
  	new webpack.optimize.UglifyJsPlugin({
  		compressor: {
        warnings: false,
      },
  	}),
  ]
});
