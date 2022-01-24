require('dotenv').config()
const fse = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { catchAsync } = require('./src/js/webpack/CatchAsync.cjs');

const { generateHtml } = require('./src/js/webpack/GenerateHtml.cjs');
catchAsync(generateHtml());

let pages = fse.readdirSync('./src')
  .filter(file => file.endsWith('.html'))
  .map(page => new HtmlWebpackPlugin({
    filename: page,
    template: `./src/${page}`
  }));

module.exports = {
  entry: { main: path.resolve(__dirname, 'src/js/index.js') },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
};