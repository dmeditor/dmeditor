const path = require('path');
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

// resolve root path
function resolve(dir) {
  return path.join(__dirname, '../../', dir);
}

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/core/index',
  target: 'web',
  output: {
    filename: 'dmeditor.min.js',
    path: resolve('./dist/lib'),
    library: {
      type: 'module',
    },
  },
  externals: {
    react: 'commonjs-module react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
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
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'README.md', to: resolve('./dist') },
        { from: 'package.json', to: resolve('./dist') },
        { from: 'LICENSE', to: resolve('./dist') },
        { from: 'changelog.txt', to: resolve('./dist') },
        { from: 'src/**/*', to: resolve('./dist/') },
      ],
    }),
  ],
  experiments: {
    outputModule: true,
  },
});
