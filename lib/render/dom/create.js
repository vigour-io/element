'use strict'
const getParent = require('./parent')
const parseStatic = require('../static')
const props = parseStatic.property
const elems = parseStatic.element

const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  const div = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  if (!this.static) { tree._[uid] = div }
  return div
}
: function renderElement (target, type, stamp, subs, tree, uid) {
  const isStatic = target.isStatic
  var div
  if (isStatic && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode()
    } else {
      div = document.createElement(target.node)
      let staticProps = props(target, type, stamp, subs, tree, div)
      if (isStatic || staticProps) {
        target._cachedNode = div
      }
      if (!staticProps) {
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
    if (target.isStatic) {
      if (!target._parent.isStatic) {
        target.domIndex = pnode.children.length
        domNode.setAttribute('data-order', target.domIndex)
        pnode.__order = target.__order
      }
      pnode.appendChild(domNode)
    } else if (!insertBefore(target, state, domNode, pnode)) {
      pnode.appendChild(domNode)
    }
  }
  return domNode
}

function insertBefore (target, state, domNode, pnode, useCached) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys(void 0, void 0, state)
    let i = keys.lastIndexOf(target.key)
    let nextChild
    let nextNode
    while ((nextChild = parent[keys[++i]])) {
      if (nextChild.domIndex !== void 0) {
        nextNode = findNodeByIndex(pnode, nextChild.domIndex)
      } else {
        console.error('state-order danger', nextChild.inspect())
      }
      if (nextNode) {
        pnode.insertBefore(domNode, nextNode)
        return true
      }
    }
  }
  pnode.__order = order
}

function findNodeByIndex (pnode, domIndex) {
  var arr = pnode.children
  for (let i = 0, len = arr.length - 1;i < len; i++) {
    let j = domIndex + i
    if (arr[j] && arr[j].getAttribute('data-order') == domIndex) { //eslint-disable-line
      return arr[j]
    } else if (i !== 0) {
      j = domIndex - i
      if (arr[j] && arr[j].getAttribute('data-order') == domIndex) { //eslint-disable-line
        return arr[j]
      }
    }
  }
}
