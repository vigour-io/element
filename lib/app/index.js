'use strict'
var isNode = require('vigour-js/lib/util/is/node')

if (isNode) {
  var App = require('../engine/string')
  module.exports = new App({
    // key: 'app'
  })
} else {
  console.log('xxxx')
  module.exports = require('./browser')
}
