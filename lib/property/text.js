'use strict'
const getParent = require('../render/dom/parent')
const append = require('../render/dom/create/append')

// operator + state remove case

// dont like the if here -- what about making 2 fields? render.state, render.static
// also saves speed!
exports.components = {
  text: {
    class: null,
    defaultSubscription: true,
    render (state, type, stamp, subs, tree, pnode, id, pid) {
      if (this.isStatic) {
        append(this, pnode, document.createTextNode(this.compute()), subs, tree, id)
      } else {
        let node = tree._[id]
        if (!node) {
          pnode = getParent(type, stamp, subs, tree, pid)
          node = tree._[id] = document.createTextNode(this.compute(state.val))
          append(this, pnode, node, subs, tree, id)
        } else {
          if (type !== 'update' && type !== 'new') {
            node.parentNode.removeChild(node)
          } else {
            node.nodeValue = this.compute(state.val)
          }
        }
      }
    }
  }
}

exports.properties = { text: { type: 'text' } }
