'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

// stuff for switch
exports.properties = {
  $switch: true,
  map (map) {
    console.log('val:', map)
    this.define({ map })
  }
}

exports.define = {
  $map (map) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    this.isStatic = null
    if (this.$) {
      const subs = this.defaultSubscription
      if (!returnValue) { returnValue = true }

      if (this.$switch) {
        const properties = this.properties
        const keys = Object.keys(properties)
        const val = { $switch: {} }

        for (let i = keys.length - 1; i >= 0; i--) {
          const key = keys[i]
          const prop = properties[key]
          if (typeof prop === 'function') {
            const base = prop.base
            if (base.isElement) {
              val.$switch[key] = base.$map()
              val.$switch[key].val = 1
            }
          }
        }

        // map the function
        val.$switch.map = this.map
        // only need remove and add
        val.$switch.val = true
        // overwrite the map
        map = add(val, map, this, 's')
      } else if (this.$any) {
        const val = { $any: this.Child.prototype.$map() }
        // 1 for only remove and add
        val.$any.val = 1
        // collection removal/addition
        add(val, map, this.Child.prototype, 't', '$any', this.$)
        // top - collection removal/addition
        map = add({ val: 1 }, map, this, 't')
      } else {
        if (subs === 'done') {
          map = add({ done: true }, map, this, 'd')
        } else {
          map = add({ val: subs }, map, this, subs === 1 ? 't' : 's')
        }
      }
      iterator(this, map)
      // console.warn('need to add subscribers here not before --- dont have info about the next children yet')
    } else if (iterator(this, map) || returnValue) {
      const subs = this.defaultSubscription
      if (!returnValue) {
        returnValue = true
      }
      if (subs === 'done') {
        map.done = true
        subscriber(map, this, 'd')
      } else {
        subscriber(map, this, 't')
      }
    }
    return returnValue || (this.hasEvents && false)
  }
}

function iterator (target, map) {
  var changed
  // here we can also write the index field -- saves a lot of problems (no indexof check anywhere)
  target.each((p, key) => {
    if (p === null) {
      console.warn('why is this null ? p:', key, p)
      return
    }
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
