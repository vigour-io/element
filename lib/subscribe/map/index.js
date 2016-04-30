'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

// ---------------------------------------------------
// cleanup this diry!
// clean this up look very dirty! defualtSubscirption can become a 1000x cleaner!
exports.define = {
  $map (map) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    if (this.$) {
      let prevmap = map
      if (!returnValue) {
        returnValue = true
      }
      if (this.$any) {
        const val = { $any: this.Child.prototype.$map(void 0) }
        if (!val.$any.$done) {
          val.$any.val = 1
        }
          // for collection removal/addition
        add(val, map, this.Child.prototype, 's', '$any', this.$)
        map = add({ val: 1 }, map, this, 't')
      } else {
        const defaultSubscription = this.defaultSubscription
        map = add(
          defaultSubscription === '$done'
            ? { $done: true }
            : { val: defaultSubscription },
          map,
          this,
          defaultSubscription === 1 ? 't' : 's'
        )
      }
      // rename all _parent to _p
      map._._parent = prevmap
      iterator(this, map)
    } else if (iterator(this, map) || returnValue) {
      // dont need any anymore???
      const defaultSubscription = this.defaultSubscription
      if (!returnValue) {
        returnValue = true
      }
      if (defaultSubscription === '$done') {
        map.$done = true
        if (map.val) { delete map.val }
        subscriber(map, this, 's')
      } else {
        subscriber(map, this, 't')
      }
    }
    return returnValue
  }
}
// ---------------------------------------------------

function iterator (target, map) {
  var changed
  target.each((p, key) => {
    if (p.$map) {
      let change = p.$map(map)
      if (change) {
        if (!changed) {
          changed = true
        }
      } else {
        p.noState = true
      }
    }
  })
  return changed
}
