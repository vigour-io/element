'use strict'

exports.properties = {
  rendered:true
}

exports.inject = [
  require('../../events'),
  require('./remove'),
  require('./constructor'),
  require('./node'),
  require('./key'),
  require('./parent'),
  require('./operator')
]
