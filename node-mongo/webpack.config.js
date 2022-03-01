const webpack = require('webpack');
const path = require('path');

const config = {
    resolve: {
      modules: ['node_modules'],
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "child_process": false,
        "os": false,
        "crypto": false,
        "url": false,
        "util": false,
        "querystring": false,
      } 
    },
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;