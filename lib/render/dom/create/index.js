'use strict'
const renderElement = require('./render')
const getParent = require('../parent')
const append = require('./append')

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  if (!pnode) {
    pnode = getParent(target, state, type, stamp, subs, tree, uid)
  }

  if (pnode) {
    append(target, pnode, domNode, subs, tree, uid)
  }

  if (target.hasEvents) {
    if (state) {
      domNode._s = state
    }
    domNode._ = target
  }
  return domNode
}
