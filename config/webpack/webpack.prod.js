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

const commonConfig = {
  mode: 'production',
  entry: './src/core/index',
  externals: {
    react: 'commonjs-module react',
    'react-dom': 'commonjs-module react-dom',
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
  optimization: {
    minimize: false,
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
      ],
    }),
  ],
};

module.exports = [
  merge(baseConfig, {
    ...commonConfig,
    target: 'node',
    output: {
      filename: 'index.cjs',
      path: resolve('./dist'),
      libraryTarget: 'commonjs2',
    },
  }),
  merge(baseConfig, {
    ...commonConfig,
    target: 'web',
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    output: {
      filename: 'index.mjs',
      path: resolve('./dist'),
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
  }),
];
