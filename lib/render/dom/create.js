'use strict'
const getParent = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  const div = document.createElement(target.node)
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
    if (target.noState) {
      if (!target._parent.noState) {
        target.domIndex = String(pnode.children.length)
        domNode.setAttribute('data-order', target.domIndex)
        pnode.__order = target.__order
      }
      pnode.appendChild(domNode)
    } else if (!insertBefore(target, state, domNode, pnode, subs)) {
      pnode.appendChild(domNode)
    }
  }
  return domNode
}

function insertBefore (target, state, domNode, pnode, subs) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys()
    let i = keys.lastIndexOf(target.key)
    let nextChild
    let nextNode

    while ((nextChild = parent[keys[++i]])) {
      // if (nextChild.noState) {
        if (nextChild.domIndex !== void 0) {
          nextNode = findNodeByIndex(pnode, nextChild.domIndex)
        } else {
          // setIndex
          console.error('state-order danger', nextChild.inspect())
        }

        if (nextNode) {
          pnode.insertBefore(domNode, nextNode)
          return true
        }
      // } else {
      //   console.log(' - this has state -', nextChild.uid(), nextChild.path())
      //   console.log(' c:', subs._.c)
      //   console.log(' t:', subs._.t)
      // }
    }
  }
  pnode.__order = order
}

function findNodeByIndex (pnode, domIndex) {
  var arr = pnode.children
  for (let i = 0, len = arr.length - 1; i < len; i--) {
    let j = domIndex + i
    if (arr[j] && arr[j].getAttribute('data-order') === domIndex) {
      return arr[j]
    } else {
      j = domIndex - i
      if (arr[j] && arr[j].getAttribute('data-order') === domIndex) {
        return arr[j]
      }
    }
  }
}
