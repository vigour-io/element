'use strict'
const context = require('./context')
const contextId = context.id
const contextOrder = context.order
module.exports = function subscriber (target, obs, type) {
  const _ = target._
  var pid, id
  if (obs.__c) {
    id = contextId(obs)
    const parent = obs.cParent()
    pid = parent.__c ? contextId(parent) : parent.uid()
    if (obs.isElement) { contextOrder(_, id, obs, parent) }
  } else {
    id = obs.uid()
    let parent = obs._parent
    while (parent && !pid) {
      if (parent.isElement) { pid = parent.uid() }
      parent = parent._parent
    }
  }
  if (!_[type]) { _[type] = {} }
  if (!_[type][id]) {
    _[type][id] = obs
    if (type === 'd') {
      if (!_.dList) { _.dList = [] }
      _.dList.unshift(id, pid, obs)
    } else {
      if (type === 's') {
        if (!_.sList) { _.sList = [] }
        _.sList.unshift(id, pid, obs)
      }
      if (!_.tList) { _.tList = [] }
      _.tList.unshift(id, pid, obs)
    }
  }
  return target
}
