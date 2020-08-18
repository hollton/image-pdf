const path = require('path')

module.exports = {
  entry: './src/main',
  output: {
    filename: 'index.js',
  	path: path.resolve(__dirname),
    library: 'imagePdf',
    libraryTarget: "umd"
  },
  module: {
  	loaders: [{
  		test: /\.js$/,
  		exclude: /node_modules/,
  		loader: 'babel-loader'
  	}]
  }
}
