'use strict'
const getParentNode = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

// order!!!! very important -- default order on setKeyInternal
function renderElement (uid, elem, type, stamp, subs, tree, ptree) {
  const noState = elem.noState
  var div
  // need to null _cachedNode on new -- else problems of course...
  if (noState && elem._cachedNode) {
    div = tree._[uid] = elem._cachedNode.cloneNode(true)
  } else {
    if (elem._cachedNode) {
      div = tree._[uid] = elem._cachedNode.cloneNode()
    } else {
      // namespace -- move to props
      div = tree._[uid] = elem.namespace
        ? document.createElementNS(elem.namespace, elem.node)
        : document.createElement(elem.node)

      let noStateProps = props(elem, type, stamp, subs, tree, ptree, div, 'dom')
      // -------- how to reuse ------------------
      if (noState || noStateProps) {
        elem._cachedNode = div
      }
    }
    elems(elem, type, stamp, subs, tree, ptree, div, 'dom')
  }
  return div
}

module.exports = function createElement (uid, target, state, type, stamp, subs, tree, ptree, pnode) {
  const domNode = renderElement(uid, target, type, stamp, subs, tree, ptree)
  pnode = pnode || getParentNode(uid, target, state, type, stamp, subs, tree, ptree)
  if (pnode) {
    pnode.appendChild(domNode)
  } else {
    console.warn('no pnode must be the app', target.path())
  }
  return domNode
}
