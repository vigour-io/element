'use strict'
const getParentNode = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

// order!!!! very important -- default order on setKeyInternal
function renderElement (target, type, stamp, subs, tree, uid) {
  const noState = target.noState
  var div
  // need to null _cachedNode on new -- else problems of course...
  if (noState && target._cachedNode) {
    div = tree._[uid] = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode()
    } else {
      // namespace -- move to props
      div = tree._[uid] = target.namespace
        ? document.createElementNS(target.namespace, target.node)
        : document.createElement(target.node)

      let noStateProps = props('dom', target, type, stamp, subs, tree, div)
      // -------- how to reuse ------------------
      if (noState || noStateProps) {
        target._cachedNode = div
      }
    }
    elems('dom', target, type, stamp, subs, tree, div)
  }
  return div
}

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  pnode = getParentNode(target, state, type, stamp, subs, tree, pnode)
  if (pnode) {
    pnode.appendChild(domNode)
  } else {
    console.warn('no pnode must be the app', target.path())
  }
  return domNode
}
