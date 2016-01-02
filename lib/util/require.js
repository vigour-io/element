'use strict'
var Module = require('module')
var assert = require('assert')
var require = function require (path) {
  assert(typeof path === 'string', 'path must be a string')
  assert(path, 'missing path')
  var _this = this
  var next = function () {
    return Module.prototype.require.next.apply(_this, arguments)
  }
  if (/scratch/.test(path)) {
    console.log('less! block it its scratch!', path)
    return {}
  }
  if (/\.less/.test(path)) {
    console.log('less! block it!', path)
    return {}
  }
  return next(path)
}
require.next = Module.prototype.require
Module.prototype.require = require
module.exports = {}
