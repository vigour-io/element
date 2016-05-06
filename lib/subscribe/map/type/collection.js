'use strict'
const add = require('../add')
module.exports = function collection (target, map, prevMap) {
  const child = target.Child.prototype
  const val = { $any: child.$map() }
  const $ = target.$.slice(0, -1)
  val.$any.val = 1
  add(val, map, child, 't', '$any', $)
  let coll = { val: 1 }
  val.$any._.p = val
  map = add(coll, map, target, 't', void 0, $)
  map._.p = prevMap
  return map
}
