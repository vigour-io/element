'use strict'
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

exports.static = function renderElementStatic (target) {
  var node
  if (target.isStatic === true && target._cachedNode) {
    node = target._cachedNode.cloneNode(true)
    if (target._cachedNode._staticIndex) {
      node._staticIndex = target._cachedNode._staticIndex
    }
  } else {
    if (target._cachedNode) {
      node = target._cachedNode.cloneNode(false)
      // double check but __order does not seem nessecary...
    } else {
      const nodeType = target.node
      if (nodeType === 'fragment') {
        node = document.createDocumentFragment()
        props(target, node)
        elems(target, node)
        target._cachedNode = node
        return node.cloneNode(true)
      } else {
        node = document.createElement(nodeType)
        props(target, node)
        target._cachedNode = node
      }
    }
    elems(target, node)
  }
  return node
}

exports.state = function renderElement (target, type, stamp, subs, tree, id, pnode) {
  var node
  // this copies unwanted styles / props
  if (target._cachedNode) {
    node = target._cachedNode.cloneNode(false)
    tree._[id] = node
    if (target._cachedNode.__order) {
      node.__order = target._cachedNode.__order
    }
  } else {
    const nodeType = target.node
    if (nodeType === 'fragment') {
      node = document.createDocumentFragment()
      props(target, node)
      elems(target, pnode)
      tree._[id] = pnode
      return node
    } else {
      node = document.createElement(nodeType)
      if (props(target, node)) {
        target._cachedNode = node
      }
    }
    tree._[id] = node
  }
  elems(target, node)
  return node
}
