'use strict'
var Delegator = require('dom-delegator')
module.exports = Delegator()

module.exports.addGlobalEventListener('touchstart', function (e) {
  e.preventDefault()
})
