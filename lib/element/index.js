'use strict'
var isNode = require('vigour-js/lib/util/is/node')
var Observable = require('vigour-js/lib/observable')

module.exports = new Observable({
  useVal: true,
  inject: isNode ? require('./node') : require('./dom'),
  ChildConstructor: 'Constructor'
}).Constructor
