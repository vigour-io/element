'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  class: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      const key = this.parent.key
      if (!this.noState) {
        var compute = state.val
        if (!pnode) {
          pnode = getParentNode(this, state, type, stamp, subs, tree)
        }
      }
      const val = key ? key + ' ' + this.compute(compute) : this.compute(compute)
      if (val) {
        pnode.className = val
      }
    }
  }
}

// default makes sure it always sets "key"
exports.class = ''
