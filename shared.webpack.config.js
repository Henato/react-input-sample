// Config recommended at https://github.com/microsoft/vscode/issues/57680 and used
// by Microsoft on its official extensions.

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

'use strict';

const path = require('path');
// @ts-ignore
const merge = require('merge-options');

module.exports = function withDefaults(/**@type WebpackConfig*/extConfig) {

  /** @type WebpackConfig */
  let defaultConfig = {
    mode: 'none',
    target: 'node',
    node: {
      __dirname: false
    },
    resolve: {
      mainFields: ['module', 'main'],
      extensions: ['.ts', '.js', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                "sourceMap": true,
              }
            }
          }]
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: [{
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                "sourceMap": false,
                module: "ESNext",
                moduleResolution: "node"
              }
            }
          }]
        },
        {
          test: /\.js$/,
          exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining'
            ]
          },
          resolve: {
            fullySpecified: false // required for react-data-grid
          }
        }
      ]
    },
    externals: {
      'vscode': 'commonjs vscode',
    },
    output: {
      filename: '[name].js',
      path: path.join(extConfig.context, 'out'),
      devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map'
  };

  return merge(defaultConfig, extConfig);
};
