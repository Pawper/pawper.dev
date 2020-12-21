const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const fse = require('fs-extra')

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy files', function() {
      fse.copySync('./src/img', './dist/img')
      fse.copySync('./src/humans.txt', './dist/humans.txt')
      fse.copySync('./src/robots.txt', './dist/robots.txt')
      fse.copySync('./src/sitemap.xml', './dist/sitemap.xml')
      fse.copySync('./src/pad/index.html', './dist/pad/index.html')
      fse.copySync('./src/pad/css', './dist/pad/css')
      fse.copySync('./src/pad/js', './dist/pad/js')
    })
  }
}

let pages = fse.readdirSync('./src').filter(function(file) {
  return file.endsWith('.html')
}).map(function(page) {
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./src/${page}`
  })
})

const config = {
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    before: function(dist, server) {
      server._watch('./src/**/*.html')
    },
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    watchContentBase: true
  },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" }
              ],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
}

if(currentTask == "build") {
  config.mode = "production"
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(new MiniCssExtractPlugin({filename: 'style.[hash].css'}), new CleanWebpackPlugin(), new WebpackManifestPlugin(), new RunAfterCompile())
}

module.exports = config