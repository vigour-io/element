'use strict'
const merge = require('../merge')
const subscriber = require('../subscriber')

module.exports = function collection (target, map) {
  const child = target.Child.prototype
  const path = target.$.slice(0, -1)
  const val = {}
  val.$any = child.$map(void 0, val)
  val.$any.val = 1
  val.val = 1
  map = merge(path, val, map, child, 't')
  subscriber(map.$any, child, 't')
  subscriber(map, target, 't')
  return map
}
