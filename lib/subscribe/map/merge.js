'use strict'
const mergeSubscriber = require('./subscriber/merge')

module.exports = function mergeSubscription (a, b) {
  if (b && typeof b !== 'object') {
    if (!a.val) { a.val = b }
  } else {
    for (var i in b) {
      if (i !== '_') {
        if (typeof a[i] === 'object') {
          mergeSubscription(a[i], b[i])
        } else if (!a[i]) {
          a[i] = b[i]
        } else if (i === 'val') {
          // make this  a better merge for when we add more things to val
          if (a.val !== b.val && b.val === true) {
            a.val = true
          }
        } else if (i === 'done') {
          a.done = true
        } else {
          a[i] = { val: a[i] }
          mergeSubscription(a[i], b[i])
        }
      } else {
        mergeSubscriber(a, b._)
      }
    }
  }
}
