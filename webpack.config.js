//@ts-check

'use strict';

const withDefaults = require('./shared.webpack.config');
const path = require('path');

const extensionConfig = withDefaults({
  context: path.join(__dirname),
  entry: {
    extension: './src/extension.ts',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'out'),
    libraryTarget: 'commonjs2'
  }
});

const sampleInputConfig = withDefaults({
  context: path.join(__dirname),
  entry: {
    view: './src/view.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'out')
  }
});

module.exports = [
  extensionConfig,
  sampleInputConfig
];
