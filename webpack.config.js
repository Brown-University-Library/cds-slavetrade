const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');

module.exports = {
  entry: {
    home: Path.resolve(__dirname, 'src/viewmodels/DataEntry.js'),
    admin: Path.resolve(__dirname, 'src/viewmodels/Admin.js')
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
      },
      {
        from: Path.resolve(__dirname, 'src/views/not-admin.html')
      },
      {
        from: Path.resolve(__dirname, 'src/client/js/auto-expand.js')
      },
      {
        from: Path.resolve(__dirname, 'src/client/css/style.css')
      }
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test   : /.js$/,
        loader : 'babel-loader'
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
