'use strict'
const subscriber = require('../subscriber')
module.exports = function (target, map, prev) {
  const subs = target.defaultSubscription
  if (subs === 'done') {
    map.done = true
    subscriber(map, target, 'd', false, prev)
  } else {
    console.log(' 3 ---->')
    subscriber(map, target, 't', false, prev)
  }
}
