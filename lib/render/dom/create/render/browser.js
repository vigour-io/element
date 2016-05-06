'use strict'
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  const isStatic = target.isStatic
  var div
  if (isStatic === true && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
    if (target._cachedNode._staticIndex) {
      div._staticIndex = target._cachedNode._staticIndex
    }
  } else {
    if (target._cachedNode) {
      div = target._cachedNode.cloneNode(false)
      if (!isStatic) {
        tree._[uid] = div
      }
      if (target._cachedNode.__order) {
        // for isStatic: 1
        div.__order = target._cachedNode.__order
      }
    } else {
      div = document.createElement(target.node)
      let staticProps = props(target, type, stamp, subs, tree, div)
      if (isStatic || staticProps) {
        target._cachedNode = div
      }
      if (!isStatic) {
        tree._[uid] = div
      }
    }
    elems(target, type, stamp, subs, tree, div)
  }
  return div
}
