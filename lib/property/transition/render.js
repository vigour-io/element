'use strict'
var ua = require('../../ua')
var PREFIX = ua.prefix
var TRANSITION = PREFIX + 'Transition'
var DEFPROPERTY = 'transitionProperty'
var PROPERTY = TRANSITION + 'Property'
var DURATION = TRANSITION + 'Duration'
var TIMING = TRANSITION + 'TimingFunction'
var DELAY = TRANSITION + 'Delay'

module.exports = exports = function (val, properties) {
  for (var i in val) {
    exports[i](val[i], properties)
  }
}

exports.property = function (val, properties) {
  properties.style[PROPERTY] = val === 'transform' ? PREFIX + '-transform' : val
  properties.style[DEFPROPERTY] = val
}

exports.duration = function (val, properties) {
  if (typeof val === 'number') {
    val += 'ms'
  }
  properties.style[DURATION] = val
}

exports.timing = function (val, properties) {
  properties.style[TIMING] = val
}

exports.delay = function (val, properties) {
  properties.style[DELAY] = val
}
