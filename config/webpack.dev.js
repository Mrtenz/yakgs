const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.common');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
});
