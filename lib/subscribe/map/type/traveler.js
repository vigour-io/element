'use strict'
const subscriber = require('../subscriber')
module.exports = function (target, map, prev) {
  if (target.defaultSubscription === 'done') {
    if ('$root' in map || '$parent' in map) {
      subscriber(map, target, 'd')
      map.done = true
    }
    nesteddone(target, map)
  } else {
    subscriber(map, target, 't')
  }
  return map
}

// this feels dirty
function nesteddone (target, map, prev) {
  if (typeof map === 'object') {
    for (let i in map) {
      if (i !== 'val' && i !== '_') {
        nesteddone(target, map[i], map)
      }
    }
    if (map.val === true) {
      prev.done = true
      subscriber(prev, target, 'd')
    }
  }
}
