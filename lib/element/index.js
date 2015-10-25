'use strict'
var isNode = require('vjs/lib/util/is/node')
var Observable = require('vjs/lib/observable')

module.exports = new Observable({
  inject: isNode ? require('./node') : require('./dom'),
  useVal: true,
  ChildConstructor: 'Constructor'
}).Constructor
