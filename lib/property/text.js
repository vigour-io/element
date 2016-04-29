'use strict'
// all dom not good!
const getParentNode = require('../render/dom/parent')
exports.properties = {
  text: {
    type: 'element',
    render: {
      dom (state, type, stamp, subs, tree, ptree, pnode, uid) {
        if (this.noState && pnode) {
          pnode.appendChild(document.createTextNode(this.compute()))
        } else {
          // operator compute is still rly fucking slow
          const val = this.compute(state.val)
          // const val = state.val //(-100% perf)
          let node = tree._[uid]
          if (!node) {
            node = tree._[uid] = document.createTextNode(val)
            pnode = getParentNode(this, state, type, stamp, subs, tree, ptree, pnode)
            pnode.appendChild(node)
          } else {
            node.nodeValue = val
          }
        }
      }
    }
  }
}