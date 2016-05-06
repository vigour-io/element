'use strict'
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  const isStatic = target.isStatic
  var node
  if (isStatic === true && target._cachedNode) {
    node = target._cachedNode.cloneNode(true)
    if (target._cachedNode._staticIndex) {
      node._staticIndex = target._cachedNode._staticIndex
    }
  } else {
    if (target._cachedNode) {
      node = target._cachedNode.cloneNode(false)
      if (!isStatic) {
        tree._[uid] = node
      }
      if (target._cachedNode.__order) {
        // for isStatic: 1
        node.__order = target._cachedNode.__order
      }
    } else {
      node = document.createElement(target.node)
      let staticProps = props(target, node)
      if (isStatic || staticProps) {
        target._cachedNode = node
      }
      if (!isStatic) {
        tree._[uid] = node
      }
    }
    elems(target, node)
  }
  return node
}
