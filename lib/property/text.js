'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  text: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      if (this.noState && pnode) {
        pnode.appendChild(document.createTextNode(this.compute()))
      } else {
        // operator compute is still rly fucking slow
        const val = state ? this.compute(state.val) : this.compute()
        var node = tree._[uid]
        if (!node) {
          node = tree._[uid] = document.createTextNode(val)
          if (!pnode) {
            pnode = getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
          }
          pnode.appendChild(node)
        } else {
          node.nodeValue = val
        }
      }
    }
  }
}
