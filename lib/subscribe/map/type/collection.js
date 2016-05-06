'use strict'
const merge = require('../merge')
const subscriber = require('../subscriber')
const iterator = require('../iterator')

module.exports = function collection (target, map) {
  const child = target.Child.prototype
  // also need to check if target does not own the child
  if (target.__c || !target.hasOwnProperty('Child')) {
    console.log('Collection with context!')
    child.__c = target
    child._cLevel = 1
  }
  const path = target.$.slice(0, -1)
  const val = {}
  val.$any = child.$map(void 0, val)
  val.$any.val = 1
  val.val = 1
  map = merge(path, val, map, child, 't')
  // subscriber(map.$any, child, 't')
  iterator(target, map)
  subscriber(map, target, 't')
  return map
}
