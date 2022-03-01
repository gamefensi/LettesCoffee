const webpack = require('webpack');
const path = require('path');
const { IgnorePlugin } = require('webpack');

const optionalPlugins = [];
if (process.platform !== "darwin") {
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}
const nodeExternals = require('webpack-node-externals');


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
      "events": false
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
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    ...optionalPlugins,
  ]
};

module.exports = config;