// webpack only builds client code
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var APP = path.resolve(__dirname, 'src/client');
var BUILD = path.resolve(__dirname, 'build');

var config = {
  // webpack output
  mode: 'development',
  entry: APP + '/index.js',
  output: {
    path: BUILD,
    filename: 'bundle.js'
  },
  // use babel
  module: {
    rules: [
      {
        test: /\.js?/,
        include: APP,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: 'index.html',
      inject: 'body',
    }) // generates the index.js file in /build directory
  ]
};

module.exports = config;