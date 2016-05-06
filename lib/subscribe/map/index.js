'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

// @todo add ._.p to every tree child .p ===> parentSub
exports.define = {
  $map (map, prev) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    this.isStatic = null
    var prevMap
    if (this.$) {
      prevMap = map
      const subs = this.defaultSubscription
      if (!returnValue) { returnValue = true }
      if (this.isSwitcher) {
        const properties = this.properties
        const $switch = { map: this.map }
        const $ = this.$.slice(0, -1)
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
        map = add({ val: 1, $switch }, map, this, 't', void 0, $, prevMap)
      } else if (this.isCollection) {
        const child = this.Child.prototype
        const val = { $any: child.$map() }
        const $ = this.$.slice(0, -1)
        val.$any.val = 1
        add(val, map, child, 't', '$any', $)
        let coll = { val: 1 }
        val.$any._.p = val
        map = add(coll, map, this, 't', void 0, $)
        map._.p = prevMap
      } else if (subs === 'done') {
        console.log('---->')
        map = add({ done: true }, map, this, 'd', false, false, prevMap)
      } else {
        console.log(' 2 ---->')
        map = add({ val: subs }, map, this, subs === 1 ? 't' : 's', false, false, prevMap)
      }
      iterator(this, map, prevMap)
      // console.warn('need to add subscribers here not before --- dont have info about the next children yet')
    } else if (iterator(this, map, prev) || returnValue) {
      const subs = this.defaultSubscription
      if (!returnValue) { returnValue = true }
      if (subs === 'done') {
        map.done = true
        subscriber(map, this, 'd', false, prev)
      } else {
        console.log(' 3 ---->')
        subscriber(map, this, 't', false, prev)
      }
    }
    return returnValue || this.hasEvents && false
  }
}

function iterator (target, map, prevMap) {
  var changed
  const keys = target.keys()
  for (let i = keys.length; i >= 0; i--) {
    let p = target[keys[i]]
    if (p && p.val !== null) {
      if (p.$map) {
        let change = p.$map(map, prevMap)
        if (change) {
          if (!changed) { changed = true }
        } else {
          p.isStatic = change === false ? 1 : true
        }
      }
    }
  }
  return changed
}
