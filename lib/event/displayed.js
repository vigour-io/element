'use strict'
module.exports = function isDisplayed (target) {
  return target.offsetParent !== null
}
