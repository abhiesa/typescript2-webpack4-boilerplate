const helpers = require('./helper');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js',
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    stats: 'minimal'
  }
});
