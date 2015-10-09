'use strict'
var isNode = require('vjs/lib/util/is/node')
var Observable = require('vjs/lib/observable')

module.exports = new Observable({
  inject:  require('./react'),//isNode ? require('./node') : require('./dom'),
  useVal: true,
  ChildConstructor: 'Constructor'
}).Constructor
