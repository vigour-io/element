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
      node = document.createElement(target.node)
      let staticProps = props(target, node)
      target._cachedNode = node
    }
    elems(target, node)
  }
  return node
}

exports.state = function renderElement (target, type, stamp, subs, tree, id) {
  var node
  // this copies unwanted styles / props
  // console.log('render', id, target.key)
  if (target._cachedNode) {
    node = target._cachedNode.cloneNode(false)
    tree._[id] = node
    if (target._cachedNode.__order) {
      node.__order = target._cachedNode.__order
    }
  } else {
    node = document.createElement(target.node)
    let staticProps = props(target, node)
    if (staticProps) {
      target._cachedNode = node
    }
    tree._[id] = node
  }
  elems(target, node)
  return node
}
