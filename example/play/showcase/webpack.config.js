module.exports = {
  entry: {
    app: ['./app/index.js']
  },
  output: {
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  }
}
