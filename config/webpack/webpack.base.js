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
      'Components': path.resolve(__dirname, '../../src/core/components'),
      'Core': path.resolve(__dirname, '../../src/core'),
      'Src': path.resolve(__dirname, '../../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  stats: 'normal',
};
