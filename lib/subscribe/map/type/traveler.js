'use strict'
const subscriber = require('../subscriber')
module.exports = function (target, map, prev) {
  if (target.defaultSubscription === 'done') {
    map.done = true
    subscriber(map, target, 'd')
  } else {
    console.log('--- traveler --->', map)
    subscriber(map, target, 't')
  }
  return map
}

//module.exports = function subscriber (target, obs, type, id, parent) {



// 'use strict'
// const merge = require('../merge')
// module.exports = function normal (target, map) {
//   const def = target.defaultSubscription
//   const path = target.$
//   if (def === 'done') {
//     map = merge(path, { done: true }, map, target, 'd')
//   } else {
//     map = merge(path, { val: def }, map, target, def === 1 ? 't' : 's')
//   }
//   return map
// }
