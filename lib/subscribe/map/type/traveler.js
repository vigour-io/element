'use strict'
const subscriber = require('../subscriber')
module.exports = function (target, map, prev) {
  if (target.defaultSubscription === 'done') {
    map.done = true
    subscriber(map, target, 'd')
  } else {
    subscriber(map, target, 't')
  }
  return map
}
