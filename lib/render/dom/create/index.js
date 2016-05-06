'use strict'
const renderElement = require('./render')
const getParent = require('../parent')
const append = require('./append')

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, id, pid) {
  const domNode = renderElement(target, type, stamp, subs, tree, id)
  if (!pnode) {
    pnode = getParent(state, type, stamp, subs, tree, pid)
  }

  if (pnode) {
    append(target, pnode, domNode, subs, tree, id)
  }

  if (target.hasEvents) {
    if (state) {
      domNode._s = state
    }
    domNode._ = target
  }

  return domNode
}
