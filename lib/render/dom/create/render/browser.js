'use strict'
const parseStatic = require('../../../static')
const props = parseStatic.property
const elems = parseStatic.element

module.exports = function renderElement (target, type, stamp, subs, tree, uid) {
  const isStatic = target.isStatic
  var div
  if (isStatic === true && target._cachedNode) {
    console.info('static - got cached node!', uid)
    div = target._cachedNode.cloneNode(true)
    if (target._cachedNode._staticIndex) {
      div._staticIndex = target._cachedNode._staticIndex
    }
  } else {
    if (target._cachedNode) {
      console.error('got cached node!', typeof uid === 'string' ? uid : target.path().join('/'), isStatic)
      div = tree._[uid] = target._cachedNode.cloneNode(false)
      if (target._cachedNode.__order) {
        div.__order = target._cachedNode.__order
      }
    } else {
      console.warn('no cached node!', uid)
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
