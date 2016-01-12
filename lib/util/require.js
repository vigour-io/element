'use strict'
var Module = require('module')
var assert = require('assert')
var process = require('process')
var fs = require('fs')
var require = function require (path) {
  assert(typeof path === 'string', 'path must be a string')
  assert(path, 'missing path')
  var _this = this
  var next = function () {
    return Module.prototype.require.next.apply(_this, arguments)
  }
  // dirty of course but prob best solution for now
  if (path === 'package.json') {
    console.log('yo!', path, process.cwd())
    var pckg = fs.readFileSync(process.cwd() + '/package.json')
    console.log(pckg)
    return JSON.parse(pckg.toString())
  }
  if (/scratch/.test(path)) {
    // console.log('less! block it its scratch!', path)
    return {}
  }
  if (/\.less/.test(path)) {
    // console.log('less! block it!', path)
    return {}
  }
  return next(path)
}
require.next = Module.prototype.require
Module.prototype.require = require
module.exports = {}
//package.json