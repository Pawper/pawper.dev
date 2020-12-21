const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyPlugin = require("copy-webpack-plugin")

const config = {
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyPlugin({patterns: [
      {from: "*.txt", to: "../dist/", context: "src/"},
      {from: "sitemap.xml", to: "../dist/", context: "src"},
      {from: "index.html", to: "../dist/pad/", context: "src/pad/"},
      {from: "*.css", to: "../dist/pad/css/", context: "src/pad/css/"},
      {from: "*.js", to: "../dist/pad/js/", context: "src/pad/js/"}
    ]})
  ],
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
  config.plugins.push(new MiniCssExtractPlugin({filename: 'style.[hash].css'}), new CleanWebpackPlugin(), new WebpackManifestPlugin())
}

module.exports = config