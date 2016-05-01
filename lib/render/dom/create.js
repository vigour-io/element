'use strict'
const getParentNode = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element
// order!!!! very important -- default order on setKeyInternal
// we can do an increment
const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  var div = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  if (!this.noState) { tree._[uid] = div }
  return div
}
: function renderElement (target, type, stamp, subs, tree, uid) {
  const noState = target.noState
  var div
  // refactor
  if (noState && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode()
    } else {
      div = document.createElement(target.node)
      let noStateProps = props(target, type, stamp, subs, tree, div)
      if (noState || noStateProps) {
        target._cachedNode = div
      }
      if (!noState) {
        tree._[uid] = div
      }
    }
    elems(target, type, stamp, subs, tree, div)
  }
  return div
}

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  if (!pnode) {
    pnode = getParentNode(target, state, type, stamp, subs, tree)
  }
  if (pnode) {
    if (!insertBefore(target, domNode, pnode)) {
      pnode.appendChild(domNode)
    }
  } else {
    console.warn('no pnode:', domNode)
  }
  return domNode
}

function insertBefore (target, domNode, pnode) {
  const order = target.__order
  if (pnode.__order > order) {
    const parent = target.parent
    const keys = parent.keys()
    // let's perf test this one
    let i = keys.lastIndexOf(target.key)
    let nextChild
    let nextNode
    while ((nextChild = parent[keys[++i]])) {
      nextNode = nextChild._cachedNode// || tree._parent[nextChild.$] && tree._parent[nextChild.$]._[nextChild.uid()]
      if (nextNode) {
        pnode.insertBefore(domNode, nextNode)
        return true
      }
    }
  }
  pnode.__order = order
}
