'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  class: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      const val = state ? this.compute(state.val) : this.compute()
      pnode = pnode || getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
      if (pnode) {
        let key = this.parent.key
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

// default makes sure it allways sets "key"
exports.class = ''
