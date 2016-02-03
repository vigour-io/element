'use strict'
var cases = require('../cases')
exports.parseEvent = cases.$touch.val ? function parseEvent (e) {
  if (e.x === void 0) {
    let ev = e._rawEvent
    let touch = ev.changedTouches
    if (touch) {
      ev = touch[0]
    }
    e.x = ev.clientX
    e.y = ev.clientY
  }
  return e
} : function parseEvent (e) {
  if (e.x === void 0) {
    let ev = e._rawEvent
    e.x = ev.clientX
    e.y = ev.clientY
  }
  return e
}
