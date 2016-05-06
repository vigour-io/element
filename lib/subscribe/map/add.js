'use strict'
const set = require('lodash.set')
const get = require('lodash.get')

module.exports = function (val, map, target, subs) {
  if (!subs) { subs = target.$ } // also allow for arrays
  const field = get(map, subs)
  if (field) {
    merge(field, val)
    return field
  } else {
    set(map, subs, val)
    let m = map
    for (var i in subs) {
      if (!m[subs[i]]._) {
        m[subs[i]]._ = { p: m }
      } else if (m[subs[i]]._.p !== m) {
        m[subs[i]]._.p = m
      }
      m = m[subs[i]]
    }
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
        } else if (i === 'val') {
          // make this  a better merge for when we add more things to val
          if (a.val !== b.val && b.val === true) {
            a.val = true
          }
        } else if (i === 'done') {
          a.done = true
        } else {
          a[i] = { val: a[i] }
          merge(a[i], b[i])
        }
      }
    }
  }
}
