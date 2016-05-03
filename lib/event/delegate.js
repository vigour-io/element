'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function delegateEvent (key, e) {
  var target = e.target
  var stamp
  do {
    let elem = target._
    if (elem) {
      let listener = elem.__on[key]
      if (listener) {
        if (!stamp) {
          stamp = vstamp.create(key)
        }
        listener.emit(elem, stamp, attachEvent(e, {
          target: target,
          state: target._s
        }))
      }
    }
  } while ((target = target.parentNode))
  if (stamp) {
    vstamp.close(stamp)
  }
}
