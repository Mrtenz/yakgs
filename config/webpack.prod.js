const merge = require('webpack-merge');
const config = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');
const UserscriptHeader = require('userscript-header');

module.exports = merge(config, {
  mode: 'none',
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new WrapperPlugin({
      header: UserscriptHeader.fromPackage(path.join(__dirname, '../package.json')).toString()
    })
  ]
});
