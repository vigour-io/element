'use strict'
const prefix = require('vigour-ua/navigator').prefix
const userSelect = prefix + 'UserSelect'

module.exports = function setUserSelect (style, val) {
  style.webkitTouchCallout = val
  style[userSelect] = val
}
