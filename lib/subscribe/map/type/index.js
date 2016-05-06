'use strict'
const add = require('../add')
module.exports = function normal (target, map, prevMap) {
  const subs = target.defaultSubscription
  if (subs === 'done') {
    map = add({ done: true }, map, target, 'd', false, false, prevMap)
  } else {
    map = add({ val: subs }, map, target, subs === 1 ? 't' : 's', false, false, prevMap)
  }
  return map
}
