'use strict'
const h = require('hyperscript')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

function renderElement (target, type, stamp, subs, tree, uid) {
  const noState = target.noState
  var node
  if (noState && target._cachedNode) {
    node = tree._[uid] = target._cachedNode // no need to clone
  } else {
    if (target._cachedNode) {
      // perform shallow clone here
      console.log('do shallow clone!!')
      node = tree._[uid] = target._cachedNode
    } else {
      node = tree._[uid] = h(target.node)
      let noStateProps = props('hyperscript', target, type, stamp, subs, tree, node)
      // -------- how to reuse ------------------
      if (noState || noStateProps) {
        target._cachedNode = node
      }
    }
    elems('hyperscript', target, type, stamp, subs, tree, node)
  }
  return node
}

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  var node = renderElement(target, type, stamp, subs, tree, uid)
  if (pnode) {
    pnode.appendChild(node)
  } else {
    console.warn('no pnode must be the app', target.path())
  }
  return node
}
