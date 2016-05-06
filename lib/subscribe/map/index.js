'use strict'
const add = require('./add')
const subscriber = require('./subscriber')
const get = require('lodash.get')
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

      let childval
      let child
      let subsVal
      let type
      let $
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
        subsVal = { val: 1, $switch }
        type = 't'
        map = add(subsVal, map, this, $)
      } else if (this.isCollection) {
        console.error('!')
        child = this.Child.prototype
        childval = { $any: child.$map() }
        $ = this.$.slice(0, -1)
        childval.$any.val = 1
        add(childval, map, child, $)
        let coll = { val: 1 }
        subsVal = coll
        type = 't'
        map = add(coll, map, this, $)
      } else if (subs === 'done') {
        subsVal = { done: true }
        type = 'd'
        map = add(subsVal, map, this)
      } else {
        subsVal = { val: subs }
        type = subs === 1 ? 't' : 's'
        map = add(subsVal, map, this)
        // map = add({ val: subs }, map, this, subs === 1 ? 't' : 's', false, false, prevMap)
      }

      iterator(this, map, prevMap)

      if (child) {
        subscriber(childval.$any, child, 't', false, prevMap)
        nestedSub(get(prevMap, $), childval)
        childval.$any._.p = childval
      }

      subscriber(subsVal, this, type, false, prevMap)
      map._.p = prevMap
      if ($) {
        const field = get(map, $)
        nestedSub(field, subsVal)
      }
    } else if (iterator(this, map, prev) || returnValue) {
      const subs = this.defaultSubscription
      if (!returnValue) { returnValue = true }
      if (subs === 'done') {
        map.done = true
        subscriber(map, this, 'd', false, prev)
      } else {
        subscriber(map, this, 't', false, prev)
      }
    }
    return returnValue || this.hasEvents && false
  }
}

function iterator (target, map, prevMap) {
  var changed
  // here we can also write the index field -- saves a lot of problems (no indexof check anywhere)
  target.each((p, key) => {
    if (p.$map) {
      let change = p.$map(map, prevMap)
      if (change) {
        if (!changed) { changed = true }
      } else {
        p.isStatic = change === false ? 1 : true
      }
    }
  })
  return changed
}

function nestedSub (a, b) {
  for (var i in b) {
    if (i !== '_') {
      if (typeof a[i] === 'object') {
        nestedSub(a[i], b[i])
      }
    } else {
      subscriber(a, b._)
    }
  }
}