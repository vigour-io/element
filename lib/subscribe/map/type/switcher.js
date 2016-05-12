'use strict'
const merge = require('../merge')
const subscriber = require('../subscriber')
const iterator = require('../iterator')
const set = require('../set')

module.exports = function switcher (target, map, prevMap) {
  const properties = target.properties
  const val = { map: target.map }
  const path = target.$.slice(0, -1)
  for (let key in properties) {
    const keyO = key[0]
    if (keyO !== '$' && keyO !== '_') {
      const prop = properties[key]
      const base = prop.base
      if (base && base.isElement) {
        val[key] = base.$map(void 0, val)
        val[key].val = 1
      }
    }
  }
  val.val = 1
  map = merge(target.$, val, map)
  subscriber(map, target, 't')
  return map
}
