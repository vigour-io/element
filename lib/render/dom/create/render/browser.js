'use strict'
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  console.log('\n\nrenderElem', target.path().join('/'), target.isStatic)
  const isStatic = target.isStatic
  var div
  if (isStatic === true && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
    // use static order here without attribute!
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode(false)
      if (target._cachedNode.__order) {
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
