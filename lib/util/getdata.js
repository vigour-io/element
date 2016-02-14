'use strict'
var Observable = require('vigour-js/lib/observable')

module.exports = function getData (target, data) {
  if (data && data.path.join('.') === 'channels.items.adb.current') {
    console.error('who is this?', target.path)
  }

  if (target._input !== void 0 && target._input !== null) {
    data = target._input
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
