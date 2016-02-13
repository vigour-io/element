'use strict'
var ua = require('../../ua')
var prefix = ua.prefix

exports.x = function (val, properties) {
  var x = val || 0
  var y = properties._y || 0
  properties._x = x
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
}

exports.y = function (val, properties) {
  var y = val || 0
  var x = properties._x || 0
  properties._y = y
  properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
}
