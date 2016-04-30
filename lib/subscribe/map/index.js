'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

exports.define = {
  $map (map) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    if (this.$) {
      const subs = this.defaultSubscription
      if (!returnValue) {
        returnValue = true
      }
      if (this.$any) {
        const val = { $any: this.Child.prototype.$map(void 0) }
        val.$any.val = 1
        // collection removal/addition
        add(val, map, this.Child.prototype, 't', '$any', this.$)
        // top - collection removal/addition
        map = add({ val: 1 }, map, this, 't')
      } else {
        if (subs === 'done') {
          map = add({ $done: true }, map, this, 'd')
        } else {
          map = add({ val: subs }, map, this, subs === 1 ? 't' : 's')
        }
      }
      iterator(this, map)
    } else if (iterator(this, map) || returnValue) {
      const subs = this.defaultSubscription
      if (!returnValue) {
        returnValue = true
      }
      if (subs === 'done') {
        map.$done = true
        subscriber(map, this, 'd')
      } else {
        subscriber(map, this, 't')
      }
    }
    return returnValue
  }
}

function iterator (target, map) {
  var changed
  target.each((p, key) => {
    if (p.$map) {
      let change = p.$map(map)
      if (change) {
        if (!changed) { changed = true }
      } else {
        p.noState = true
      }
    }
  })
  return changed
}
