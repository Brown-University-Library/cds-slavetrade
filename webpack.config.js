const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');

module.exports = {
  entry: {
    home: Path.resolve(__dirname, 'src/viewmodels/DataEntry.js')
  },
  output: {
    path: Path.resolve(__dirname, 'dist', 'client'),
    filename: '[name]-bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: Path.resolve(__dirname, 'src/views/home.html')
      },
      {
        from: Path.resolve(__dirname, 'src/views/admin.html')
      }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
