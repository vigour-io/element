'use strict'
var Observable = require('vigour-js/lib/observable')

module.exports = function getData (target, data) {
  if (target.__input !== void 0 && target.__input !== null) {
    data = target.__input
    if (data instanceof Observable) {
      data = data.origin
      if (target.$ && target.$ !== true) {
        data = data.retrieve(target.$)
      }
    } else {
      data = target.parseValue()
    }
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin
      if (target.$ && target.$ !== true) {
        if (data.path[data.path.length - 1] === target.$[0]) {
          data = data.retrieve(target.$)
        } else {
          data = data.retrieve(target.$)
        }
      }
    }
  }
  return data
}
