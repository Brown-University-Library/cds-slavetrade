const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/viewmodels/DataEntry.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/views/home.html')
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
  }
};
