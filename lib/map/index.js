'use strict'
const add = require('./add')
const subscriber = require('./subscriber')

exports.define = {
  $map (map, any) {
    var returnValue
    if (!map) {
      returnValue = map = {}
    }
    this.each((p, key, base, map) => {
      if (p.$map) {
        let change = p.$map(map)
        if (change) {
          if (!returnValue) {
            returnValue = true
          }
        } else {
          // call this _noState, clearer
          p.noState = true
        }
      }
    }, false, map)

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
    } else if (returnValue && !any) {
      subscriber(map, this, 't')
    }
    return returnValue
  }
}
