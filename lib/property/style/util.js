'use strict'
const isNumber = require('vigour-util/is/number')

exports.appendUnit = function (val, unit) {
  return (isNumber(val) ? val + unit : val)
}
