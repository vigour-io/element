exports.skew = function(x, y) {
  return x + 'deg, ' + y + 'deg'
}

exports.translate = function(x, y) {
  return x + 'px, ' + y + 'px'
}

exports.translate3d = function(x, y, z) {
  return x + 'px, ' + y + 'px, ' + z
}

exports.rotate = function (deg) {

}

exports.transformOrigin = function(x, y, z) {
  if (!z) z = 0

  if (util.isNumber(x)) {
    return x + 'px, ' + y + 'px, ' + z
  } else {
    return x + ' ' + y + ' ' + z
  }
}

exports.scale = function(x, y) {
  return x + ', ' + y
}