'use strict'
const getParent = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

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
    pnode = getParent(target, state, type, stamp, subs, tree, uid)
  }
  if (pnode) {
    // if (!insertBefore(target, state, domNode, pnode)) {
    pnode.appendChild(domNode)
    // }
  }
  return domNode
}

function insertBefore (target, state, domNode, pnode) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()

    // uids ---
    const keys = parent.keys(void 0, void 0, state)
    // let's perf test this one
    let i = keys.lastIndexOf(target.key)
    let nextChild
    let nextNode
    while ((nextChild = parent[keys[++i]])) {
      nextNode = nextChild._cachedNode
      if (nextNode) {
        if (nextNode.parentNode !== pnode) {
          console.log(nextNode.parentNode)
          let i = getNodeIndex(nextNode.parentNode, nextNode)
          nextNode = pnode.children[i]
          // keep counting down until you find something?
          console.log('node and index', nextNode, i, pnode.children)
        }
        pnode.insertBefore(domNode, nextNode)
        return true
      }
    }
  }
  pnode.__order = order
}

function getNodeIndex (pnode, node) {
  for (let arr = pnode.children, i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === node) {
      return i
    }
  }
}
