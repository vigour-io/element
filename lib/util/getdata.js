'use strict'
var Observable = require('vigour-js/lib/observable')

module.exports = function getData (target, data) {
  // console.error(target.path, target, data)
  if(data && data.path.join('.') === 'channels.items.adb.current') {
    console.error('who is this?', target.path)
  }
  // dont call this if the data is allreayd parsed

  if (target._input !== void 0 && target._input !== null) {
    data = target._input
    if (data instanceof Observable) {
      // console.info('DO IT!')
      data = data.origin
      if (target.$ && target.$ !== true) {
        data = data.retrieve(target.$)
      }
    } else {
      // console.info('WRONG> DO IT!', target.path)
      data = target.parseValue()
    }
  } else if (data) {
    if (data instanceof Observable) {
      data = data.origin
      if (target.$ && target.$ !== true) {
        // console.info('WTF!', target.path, data.path, target.$)
        // problem --
        // this is so fucking weird
        if (data.path[data.path.length - 1] === target.$[0]) {
          console.error('\n\n\n\n total wrong!', data.path.join('.'))
          data = data.retrieve(target.$)
        } else {
          data = data.retrieve(target.$)
        }
        // console.error('?????')
      }
    }
  }
  return data
}
