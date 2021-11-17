import fse from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path'; 
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pages = fse.readdirSync('./src')
  .filter(file => file.endsWith('.html'))
  .map(page => new HtmlWebpackPlugin({
    filename: page,
    template: `./src/${page}`
  }));

export default {
  entry: { main: path.resolve(__dirname, 'src/index.js') },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpg)$/i,
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