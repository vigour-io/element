'use strict'
const render = require('./render')
const renderStatic = render.static
const renderState = render.state
const getParent = require('../parent')
const append = require('./append')
const appendStatic = append.static
const appendState = append.state

exports.static = function createElementStatic (target, pnode) {
  const domNode = renderStatic(target)
  appendStatic(target, pnode, domNode)
  if (target.hasEvents) { domNode._ = target }
  return domNode
}

exports.state = function createElementState (target, state, type, stamp, subs, tree, id, pid) {
  const pnode = getParent(type, stamp, subs, tree, pid)
  const domNode = renderState(target, type, stamp, subs, tree, id, pnode)
  if (pnode) {
    appendState(target, pnode, domNode, subs, tree, id)
  }
  if (target.hasEvents) {
    domNode._s = state
    domNode._ = target
  }
  return domNode
}
