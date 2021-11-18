const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'src/humans.txt'), to: path.join(__dirname, 'dist/humans.txt') },
        { from: path.join(__dirname, 'src/robots.txt'), to: path.join(__dirname, 'dist/robots.txt') },
        { from: path.join(__dirname, 'src/sitemap.xml'), to: path.join(__dirname, 'dist/sitemap.xml') }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ]
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  }
});