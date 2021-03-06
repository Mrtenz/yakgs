const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.common');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');
const UserscriptHeader = require('userscript-header');

module.exports = merge(config, {
  mode: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MinifyPlugin(),
    new WrapperPlugin({
      header: UserscriptHeader.fromPackage(path.join(__dirname, '../package.json')).toString()
    })
  ]
});
