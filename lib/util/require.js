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
  console.log('element-safe-require: requiring <' + path + '> from <' + this.id + '>')
  if (/\.less$/.test(path)) {
    return {}
  }
  return next(path)
}
require.next = Module.prototype.require
Module.prototype.require = require
module.exports = {}
