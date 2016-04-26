'use strict'
const set = require('lodash.set')
const get = require('lodash.get')
const subscriber = require('./subscriber')
// unsubscribe will be difficult
module.exports = function (val, map, target, subs, subsTarget) {
  if (!subs) { subs = target.$ } // also allow for arrays
  const field = get(map, subs)
  subscriber(subsTarget ? get(val, subsTarget) : val, target, 's')
  if (field) {
    merge(field, val, subsTarget)
    return field
  } else {
    set(map, subs, val)
    return val
  }
}

function merge (a, b) {
  if (b && typeof b !== 'object') {
    if (!a.val) { a.val = b }
  } else {
    for (var i in b) {
      if (i !== '_') {
        if (typeof a[i] === 'object') {
          merge(a[i], b[i])
        } else if (!a[i]) {
          a[i] = b[i]
        } else if (i !== 'val') {
          a[i] = { val: a[i] }
          merge(a[i], b[i])
        }
      } else {
        subscriber(a, b._)
      }
    }
  }
}
