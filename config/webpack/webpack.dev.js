const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  cache: {
    type: 'filesystem',
  },
  entry: {
    main: './samples/dev/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'cache',
              babelrc: false,
              presets: [
                ['@babel/preset-env', { targets: 'maintained node versions' }],
                '@babel/preset-typescript',
              ],
              plugins: [
                // ['@babel/plugin-proposal-class-properties', { loose: true }],
                // ['@babel/plugin-proposal-nullish-coalescing-operator'],
              ],
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'cache',
            },
          },
        ],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: 'cache',
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: false,
            },
          },
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 2023,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/samples/dev', 'index.html'),
      filename: 'index.html',
      hash: true,
      inject: 'head',
      title: 'DM Editor',
    }),
  ],
});
