const path = require('path');

module.exports = {
  externals: {},
  // externalsType: 'window',
  mode: 'development',
  optimization: {
    removeAvailableModules: true,
    // removeEmptyChunks: true,
    // minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  plugins: [],
  resolve: {
    alias: {
      dmeditor: path.resolve(__dirname, '../../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  stats: 'normal',
};
