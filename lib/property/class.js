'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  class: {
    type: 'property',
    render: {
      dom (state, type, stamp, subs, tree, ptree, pnode, uid) {
        pnode = getParentNode(this, state, type, stamp, subs, tree, ptree, pnode)
        if (pnode) {
          const val = state ? this.compute(state.val) : this.compute()
          const key = this.parent.key
          // only when not svg for example
          if (key) {
            pnode.className = val ? key + ' ' + val : key
          } else if (val) {
            pnode.className = val
          }
        }
      }
    }
  }
}

// default makes sure it always sets "key"
exports.class = ''
