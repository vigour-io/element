'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

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

      if (this.isSwitcher) {
        const properties = this.properties
        const val = { map: this.map }
        for (let key in properties) {
          const keyO = key[0]
          if (keyO !== '$' && keyO !== '_') {
            const prop = properties[key]
            const base = prop.base
            if (base && base.isElement) {
              val[key] = base.$map()
              val[key].val = 1
            }
          }
        }
        const arr = this.$.split('.')
        arr.pop()
        map = add({ val: 1, $switch: val }, map, this, 't', void 0, arr)
        // subscriber({  }, this, 't')
        // add(val, map, this, 's')//, '$switch', arr)
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
    if (this.hasEvents) {
      console.log('----->', this.path(), this.hasEvents, this.hasOwnProperty('hasEvents'))
    }
    return returnValue || ((this.hasEvents && this.hasOwnProperty('hasEvents')) ? false : void 0)
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
