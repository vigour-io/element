'use strict'
var compute = require('vigour-observable').prototype.compute
var create = require('../render/dom/create')

exports.properties = {
  order: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (state) {
        // const elem = this.parent
        // const parent = elem.parent
        // parent.clearKeys(parent)
        // const keys = parent.keys(void 0 , void 0 ,state)
      }
    },
    define: {
      compute (val, previousVal, stamp, origin) {
        val = compute.call(this, val, previousVal, stamp, origin)
        return typeof val === 'number' ? val : 0
      }
    }
  }
}
