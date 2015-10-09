'use strict'

exports.inject = [
  require('../../events'),
  require('./remove'),
  require('./constructor'),
  require('./node'),
  require('./key'),
  require('./parent')
]
