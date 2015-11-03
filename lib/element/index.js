'use strict'
var isNode = require('vjs/lib/util/is/node')
var Observable = require('vjs/lib/observable')

module.exports = new Observable({
  useVal: true,
  inject: isNode ? require('./node') : require('./dom'),
  ChildConstructor: 'Constructor'
}).Constructor