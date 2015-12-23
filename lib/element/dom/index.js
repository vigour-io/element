'use strict'

exports.properties = {
  rendered: true
}

exports.inject = [
  require('./operator'),
  require('vigour-js/lib/operator/subscribe'),
  require('../../property/transform'),
  require('../../property/text'),
  require('../../property/css'),
  require('../../property/data'),
  require('./constructor'),
  require('../../events'),
  require('./remove'),
  require('./node'),
  require('./key')
]
