'use strict'
const set = require('lodash.set')
const get = require('lodash.get')
const subscriber = require('./subscriber')
const merge = require('./merge')
// unsubscribe will be difficult
module.exports = function (val, map, target, type, subsTarget, subs, parent) {
  if (!subs) { subs = target.$ } // also allow for arrays
  const field = get(map, subs)
  subscriber(subsTarget ? get(val, subsTarget) : val, target, type, false, parent)
  if (field) {
    merge(field, val, subsTarget)
    return field
  } else {
    // wrong need parent!!!! for multiple
    // add parents
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

