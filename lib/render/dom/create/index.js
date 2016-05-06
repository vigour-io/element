'use strict'
const renderElement = require('./render')
const getParent = require('../parent')
const append = require('./append')
const appendStatic = append.static
const appendState = append.state

exports.static = function createElementStatic (target, pnode) {
  const domNode = renderElement(target)
  appendStatic(target, pnode, domNode)
  if (target.hasEvents) { domNode._ = target }
  return domNode
}

exports.state = function createElementState (target, state, type, stamp, subs, tree, pnode, id, pid) {
 const domNode = renderElement(target, type, stamp, subs, tree, id)
  pnode = getParent(type, stamp, subs, tree, pid)
  if (pnode) {
    appendState(target, pnode, domNode, subs, tree, id)
  }
  if (target.hasEvents) {
    domNode._s = state
    domNode._ = target
  }
  return domNode
}
