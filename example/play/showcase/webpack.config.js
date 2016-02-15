module.exports = {
  entry: {
    app: ['./app/index.js']
  },
  output: {
    filename: 'bundle.js'
  },
  node: {
    global: true
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less?strictMath'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   loader: 'babel', // 'babel-loader' is also a legal name to reference
      //   query: {
      //     presets: ['es2015']
      //   }
      // }
    ]
  }
}
