'use strict'
// all dom not good!
const getParentNode = require('../render/dom/parent')

exports.properties = {
  text: {
    type: 'element',
    defaultSubscription: true,
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (this.noState) {
        pnode.appendChild(document.createTextNode(this.compute()))
      } else {
        const val = this.compute(state.val)
        const node = tree._[uid]
        if (!node) {
          getParentNode(this, state, type, stamp, subs, tree, pnode)
            .appendChild(tree._[uid] = document.createTextNode(val))
        } else {
          node.nodeValue = val
        }
      }
    }
  }
}
