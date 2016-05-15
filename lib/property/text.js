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
      static (target, pnode) {
        appendStatic(target, pnode, document.createTextNode(target.compute()))
      },
      state  (target, state, type, stamp, subs, tree, id, pid) {
        var node = tree._[id]
        var pnode
        if (!node) {
          pnode = getParent(type, stamp, subs, tree, pid)
          // has to be compute make it fast
          node = tree._[id] = document.createTextNode(target.compute(state.val || state))
          appendState(target, pnode, node, subs, tree, id)
        } else {
          if (type !== 'update' && type !== 'new') {
            node.parentNode.removeChild(node)
          } else {
            // has to be compute make it fast -- its ultra slow now!
            // easpecially creating the operator keys rly need to optmize
            node.nodeValue = target.compute(state.val || state)
          }
        }
      }
    }
  }
}

exports.properties = { text: { type: 'text' } }
