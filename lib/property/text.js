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
        const val = this.compute(state.val)
        let node = tree._.text
        if (!node) {
          node = tree._.text = document.createTextNode(val)
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
