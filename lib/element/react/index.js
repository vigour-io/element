'use strict'

exports.inject = [
  require('../../events'),
  require('./constructor'),
  require('./node'),
  require('./key'),
  require('./parent')
]
