const path = require('path');
var helpers = require('./helper');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'index': './app/index.ts'
  },
  resolve: {
    extensions: [".ts", ".js",".html",".json",".css",".scss"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  	new webpack.optimize.OccurrenceOrderPlugin(),
  	new HtmlWebpackPlugin({
      template: './template/index.html'
    }),
    new ExtractTextPlugin("style.css"),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' },]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['index', 'vendor', 'polyfills']
    })
  ],
  module: {
    rules: [
      {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre",
          exclude: "/node_modules/"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ require('autoprefixer')({ browsers: 'last 2 versions' }) ],
              sourceMap: true,
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
        use: 'file-loader'
      }
    ]
  }
};
