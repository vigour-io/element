'use strict'
const getParent = require('../render/dom/parent')
const append = require('../render/dom/create/append')
// _$r is a temporary fix
exports.components = {
  text: {
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
          if (pnode._$r) {
            node = tree._[uid] = pnode._$r
            node.nodeValue = val
            pnode._textIsHot = null
          } else {
            const div = tree._[uid] = document.createTextNode(val)
            append(this, pnode, div, subs, tree, uid)
          }
        } else {
          if (type !== 'update' && type !== 'new') {
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

exports.properties = { text: { type: 'text' } }
