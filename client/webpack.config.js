const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: ['p5'],
    bundle: './entry.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'p5': path.resolve(__dirname, 'node_modules/p5/lib/p5.min.js')
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/ws': {
        target: 'ws://server:3000/ws',
        secure: false
      }
    }
  }
};
