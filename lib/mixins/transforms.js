var util = require('vjs/lib/util')

exports.skew = function(x, y) {
  return x + 'deg, ' + y + 'deg'
}

exports.translate = function(x, y) {
  return x + 'px, ' + y + 'px'
}

exports.translate3d = function(x, y, z) {
  return x + 'px, ' + y + 'px, ' + z + 'px'
}

exports.transformOrigin = function(x, y, z) {
  if (!x) x = '50%'
  if (!y) y = '50%'
  if (!z) z = 0

  return util.isNumber(x) ? (x + 'px') : x + ' ' + util.isNumber(y) ? (y + 'px') : y + ' ' + z
}

exports.scale = function(x, y) {
  return x + ', ' + y
}