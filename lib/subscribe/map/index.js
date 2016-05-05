'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

// @todo add ._.p to every tree child .p ===> parentSub
exports.define = {
  $map (map) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    this.isStatic = null
    const prevMap = map
    if (this.$) {
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
        add(val, map, child, 't', '$any', $, prevMap)
        map = add({ val: 1 }, map, this, 't', void 0, $, prevMap)
      } else if (subs === 'done') {
        map = add({ done: true }, map, this, 'd', false, false, prevMap)
      } else {
        map = add({ val: subs }, map, this, subs === 1 ? 't' : 's', false, false, prevMap)
      }
      iterator(this, map)
      // console.warn('need to add subscribers here not before --- dont have info about the next children yet')
    } else if (iterator(this, map) || returnValue) {
      const subs = this.defaultSubscription
      if (!returnValue) { returnValue = true }
      if (subs === 'done') {
        map.done = true
        console.log('ugh')
        subscriber(map, this, 'd', false)
      } else {
        subscriber(map, this, 't', false)
      }
    }
    return returnValue || this.hasEvents && false
  }
}

function iterator (target, map) {
  var changed
  // here we can also write the index field -- saves a lot of problems (no indexof check anywhere)
  target.each((p, key) => {
    if (p.$map) {
      let change = p.$map(map)
      if (change) {
        if (!changed) { changed = true }
      } else {
        p.isStatic = change === false ? 1 : true
      }
    }
  })
  return changed
}
