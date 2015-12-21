'use strict'

exports.properties = {
  rendered: true
}

exports.inject = [
  require('../../property/transform'),
  require('../../property/text'),
  require('../../property/css'),
  require('./constructor'),
  require('../../events'),
  require('./remove'),
  require('./node'),
  require('./key'),
  require('./operator')
]
