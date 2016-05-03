'use strict'
const append = require('./append')
const getParent = require('../parent')
const parseStatic = require('../../static')
const props = parseStatic.property
const elems = parseStatic.element

// do this in the browser field == this is a little bit dirty (unnesecary code in the browser)
const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  var div = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  if (!target.isStatic) { tree._[uid] = div }
  return div
}
: function renderElement (target, type, stamp, subs, tree, uid) {
  const isStatic = target.isStatic
  var div
  if (isStatic === true && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode(false)
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

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  if (!pnode) {
    pnode = getParent(target, state, type, stamp, subs, tree, uid)
  }
  if (pnode) { append(target, pnode, domNode) }
  if (target.hasEvents) {
    if (state) { domNode._s = state }
    domNode._ = target
  }
  return domNode
}
