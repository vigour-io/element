'use strict'
const merge = require('../merge')

//module.exports = function (val, map, target, type, subs) {

module.exports = function collection (target, map, prevMap) {
  const child = target.Child.prototype
  const val = { $any: child.$map() }
  const $ = target.$.slice(0, -1)
  val.$any.val = 1
  merge(val, map, child, 't', '$any', $)
  let coll = { val: 1 }
  val.$any._.p = val
  map = merge(coll, map, target, 't', void 0, $)
  map._.p = prevMap
  return map
}
