'use strict'
const merge = require('../merge')
const iterator = require('../iterator')
const subscriber = require('../subscriber')

module.exports = function normal (target, map) {
  const def = target.defaultSubscription
  const path = target.$
  var type
  if (def === 'done') {
    type = 'd'
    if (path !== true) {
      map = merge(path, { done: true }, map, target, type)
    } else {
      map.val = true
    }
  } else {
    type = def === 1 ? 't' : 's'
    if (path !== true) {
      map = merge(path, { val: def }, map, target, type)
    } else if (map.val !== true) {
      map.val = def
    }
  }
  iterator(target, map)
  subscriber(map, target, type)
  return map
}
