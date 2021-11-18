const fse = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let pages = fse.readdirSync('./src')
  .filter(file => file.endsWith('.html'))
  .map(page => new HtmlWebpackPlugin({
    filename: page,
    template: `./src/${page}`
  }));

module.exports = {
  entry: { main: path.resolve(__dirname, 'src/index.js') },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.webp$/i,
        type: 'asset/resource'
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
    assetModuleFilename: 'img/[hash][ext]',
    clean: true
  }
};