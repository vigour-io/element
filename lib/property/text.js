'use strict'
const getParent = require('../render/dom/parent')

// $r temporary fix
exports.properties = {
  text: {
    type: 'element',
    class: null,
    defaultSubscription: true,
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (this.isStatic) {
        pnode.appendChild(document.createTextNode(this.compute()))
      } else {
        const val = state ? this.compute(state.val) : this.compute()
        let node = tree._[uid]
        if (!node) {
          if (!pnode) {
            pnode = getParent(this, state, type, stamp, subs, tree, uid)
          }

          if (!pnode) {
            console.error('no pnode', state.inspect())
          } else if (pnode._$r) {
            node = tree._[uid] = pnode._$r
            node.nodeValue = val
            pnode._textIsHot = null
          } else {
            pnode.appendChild(tree._[uid] = document.createTextNode(val))
          }
        } else {
          if (type === 'remove') {
            if (val) {
              node.nodeValue = val
              node.parentNode._$r = node
            } else {
              node.parentNode.removeChild(node)
            }
          } else {
            node.nodeValue = val
          }
        }
      }
    }
  }
}
