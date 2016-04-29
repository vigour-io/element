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
        add(val, map, this.Child.prototype, this.$, '$any')
        // also needs less -- maybe t can be replaced /w something else?
        map = add({ val: 1 }, map, this)
      } else {
        // default val or something??
        console.log(this.defaultSubscription, this.path())
        // default subs thats what it is
        map = add({ val: this.defaultSubscription }, map, this)
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
