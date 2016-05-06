'use strict'
const set = require('./set')
const get = require('lodash.get')
const subscriber = require('./subscriber')
const merge = require('./merge')

module.exports = function (val, map, target, type, subsTarget, subs, parent) {
  if (!subs) { subs = target.$ } // also allow for arrays
  const field = get(map, subs)
  subscriber(subsTarget ? get(val, subsTarget) : val, target, type, false, parent)
  if (field) {
    merge(field, val, subsTarget)
    return field
  } else {
    return set(val, map, subs)
  }
}

// module.exports = function (subs, val, map, target) {
//   if (!subs) { subs = target.$ } // also allow for arrays
//   const field = get(map, subs)
//   // subscriber(subsTarget ? get(val, subsTarget) : val, target, type, false, parent)
//   if (field) {
//     merge(field, val)
//     return field
//   } else {
//     return set(val, map, subs)
//   }
// }
