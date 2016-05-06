'use strict'
const add = require('../add')
module.exports = function switcher (target, map, prevMap) {
  const properties = target.properties
  const $switch = { map: target.map }
  const $ = target.$.slice(0, -1)
  for (let key in properties) {
    const keyO = key[0]
    if (keyO !== '$' && keyO !== '_') {
      const prop = properties[key]
      const base = prop.base
      if (base && base.isElement) {
        $switch[key] = base.$map()
        $switch[key].val = 1
      }
    }
  }
  map = add({ val: 1, $switch }, map, target, 't', void 0, $, prevMap)
}
