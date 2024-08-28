const path = require('path');

module.exports = {
  // ... existing configuration ...
  module: {
    rules: [
      // ... existing rules ...
      {
        test: /\.(node)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.node'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
};
