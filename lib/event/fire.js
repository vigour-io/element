'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function fireEvent (type, e, data, listeners, elem, start, end) {
  if (data.target.offsetParent !== null) {
    const stamp = vstamp.create(type)
    attachEvent(e, data)
    for (let i in listeners) {
      listeners[i].call(elem, data, stamp)
    }
    vstamp.close(stamp)
    return true
  }
}
