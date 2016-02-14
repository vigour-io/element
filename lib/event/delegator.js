'use strict'
// var document = require("global/document")
var Delegator = require('dom-delegator')
module.exports = Delegator()

module.exports.addGlobalEventListener('touchstart', function (e) {
  e.preventDefault()
})
