'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

exports.define = {
  $map (map, any) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    if (this.$) {
      if (!returnValue) {
        returnValue = true
      }
      if (this.$any) {
        let val = { $any: this.Child.prototype.$map(void 0, true) }
        val.$any.val = 1 // for collection removal/addition
        add(val, map, this.Child.prototype, 's', '$any', this.$)
        // also needs less -- maybe t can be replaced /w something else?
        map = add({ val: 1 }, map, this, 't')
      } else {
        // default val or something??
        // default subs thats what it is
        const defaultSubscription = this.defaultSubscription
        map = add(
          { val: defaultSubscription },
          map,
          this,
          defaultSubscription === 1 ? 't' : 's'
        )
      }
      iterator(this, map)
    } else if (iterator(this, map) || returnValue) {
      if (!returnValue) {
        returnValue = true
      }
      subscriber(map, this, 't')
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
