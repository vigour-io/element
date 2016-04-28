'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

exports.define = {
  $map (map, any) {
    var returnValue
    if (!map) {
      returnValue = map = this._$map = {}
    }
    // iterator(this, map)

    if (this.$) {
      if (!returnValue) {
        returnValue = true
      }
      if (this.$any) {
        let val = { $any: this.Child.prototype.$map(void 0, true) }
        val.$any.val = 1 // for collection removal/addition
        add(val, map, this.Child.prototype, this.$, '$any')
        map = add({ val: 1 }, map, this)
      } else {
        map = add({ val: true }, map, this)
      }
      iterator(this, map)
    } else if (!any && iterator(this, map)) {
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
  target.each((p, key, base) => {
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
