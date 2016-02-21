'use strict'
var ua = require('../../ua')
var prefix = ua.prefix

exports.x = function (val, properties) {
  var x = val
    ? typeof val === 'number'
      ? val + 'px'
      : val
    : 0
  var y = properties._y || 0
  var z = properties._z || 0
  properties._x = x
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + ', ' + y + ', ' + z + ')'
}

exports.y = function (val, properties) {
  var y = val
    ? typeof val === 'number'
      ? val + 'px'
      : val
    : 0
  var x = properties._x || 0
  var z = properties._z || 0
  properties._y = y
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + ', ' + y + ', ' + z + ')'
}

exports.z = function (val, properties) {
  var z = val
    ? typeof val === 'number'
      ? val + 'px'
      : val
    : 0
  var y = properties._y || 0
  var x = properties._x || 0
  properties._z = z
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + ', ' + y + ', ' + z + ')'
}
