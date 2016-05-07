'use strict'
const context = require('./context')
const contextId = context.id
const contextOrder = context.order
module.exports = function subscriber (target, obs, type) {
  const _ = target._
  var store = _[type] || (_[type] = {})
  var pid, id
  if (obs.__c) {
    id = contextId(obs)
    const parent = obs.cParent()
    pid = parent.__c ? contextId(parent) : getUid(parent)
    if (obs.isElement) { contextOrder(_, id, obs, parent) }
  } else {
    id = obs.uid()
    pid = getUid(obs._parent)
  }
  if (!store[id]) {
    store[id] = obs
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

function getUid (parent) {
  let pid
  while (parent && !pid) {
    if (parent.isElement) { pid = parent.uid() }
    parent = parent._parent
  }
  return pid || false
}
