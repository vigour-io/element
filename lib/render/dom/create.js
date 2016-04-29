'use strict'
const getParentNode = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element
  // order!!!! very important -- default order on setKeyInternal
const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  var div = tree._[uid] = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  return div
}
: function renderElement (target, type, stamp, subs, tree, uid) {
  const noState = target.noState
  var div
    // need to null _cachedNode on new -- else problems of course...
  if (noState && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = target._cachedNode.cloneNode()
    } else {
      div = document.createElement(target.node)
      let noStateProps = props(target, type, stamp, subs, tree, div)
      if (noState || noStateProps) {
        target._cachedNode = div
      }
    }
    elems(target, type, stamp, subs, tree, div)
  }
  return (tree._[uid] = div)
}

module.exports = function createElement(target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  if (!pnode) {
    pnode = getParentNode(target, state, type, stamp, subs, tree)
  }
  if (pnode) {
    pnode.appendChild(domNode)
  } else {
    console.warn('no pnode must be the app', target.path())
  }
  return domNode
}
