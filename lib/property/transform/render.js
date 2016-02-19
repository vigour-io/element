'use strict'
var ua = require('../../ua')
var prefix = ua.prefix

exports.x = function (val, properties) {
  var x = val || 0
  var y = properties._y || 0
  properties._x = typeof x === 'number' ? x + 'px' : x
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + ', ' + y + ', 0)'
}

exports.y = function (val, properties) {
  var y = val || 0
  var x = properties._x || 0
  properties._y = typeof y === 'number' ? y + 'px' : y
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + ', ' + y + ', 0)'
}
