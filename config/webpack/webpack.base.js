const path = require('path');

module.exports = {
  externals: {},
  // externalsType: 'window',
  mode: 'development',
  optimization: {
    removeAvailableModules: true,
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
      dmeditor: path.resolve(__dirname, '../../src/core'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  stats: 'normal',
};
