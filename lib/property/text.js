'use strict'
const getParent = require('../render/dom/parent')
const append = require('../render/dom/create/append')
const appendStatic = append.static
const appendState = append.state

// operator + state remove case
exports.components = {
  text: {
    class: null,
    defaultSubscription: true,
    render: {
      static (target, state, type, stamp, subs, tree, pnode) {
        appendStatic(target, pnode, document.createTextNode(target.compute()))
      },
      state  (target, state, type, stamp, subs, tree, pnode, id, pid) {
        let node = tree._[id]
        if (!node) {
          pnode = getParent(type, stamp, subs, tree, pid)
          node = tree._[id] = document.createTextNode(target.compute(state.val))
          appendState(target, pnode, node, subs, tree, id)
        } else {
          if (type !== 'update' && type !== 'new') {
            node.parentNode.removeChild(node)
          } else {
            node.nodeValue = target.compute(state.val)
          }
        }
      }
    }
  }
}

exports.properties = { text: { type: 'text' } }
