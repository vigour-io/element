'use strict'
const getParent = require('../render/dom/parent')

exports.properties = {
  text: {
    type: 'element',
    class: null,
    defaultSubscription: true,
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (this.isStatic) {
        pnode.appendChild(document.createTextNode(this.compute()))
      } else {
        // remove extra check for "state" if possible!
        const val = state ? this.compute(state.val) : this.compute()
        const node = tree._[uid]
        if (!node) {
          if (!pnode) {
            pnode = getParent(this, state, type, stamp, subs, tree, uid)
          }
          pnode.appendChild(tree._[uid] = document.createTextNode(val))
        } else {
          node.nodeValue = val
        }
      }
    }
  }
}
