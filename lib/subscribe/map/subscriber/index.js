'use strict'
const context = require('./context')
const contextId = context.id
const contextOrder = context.order
module.exports = function subscriber (target, obs, type, id, parent) {
  let _ = target._
  if (!target._) { target._ = _ = { p: parent } }
  let pid
  if (!id) {
    if (obs.__c) {
      id = contextId(obs)
      const parent = obs.cParent()
      pid = parent.__c ? contextId(parent) : parent._uid
      if (obs.isElement) {
        contextOrder(_, id, obs, parent)
      }
    } else {
      id = obs.uid()
    }
  }
  if (!_[type]) { _[type] = {} }
  if (!pid) { pid = obs._parent && obs._parent.uid() }
  if (!_[type][id]) {
    _[type][id] = obs
    if (type === 'd') {
      if (!_.dList) { _.dList = [] }
      _.dList.unshift(id, pid || false, obs)
    } else {
      if (type === 's') {
        if (!_.sList) { _.sList = [] }
        _.sList.unshift(id, pid || false, obs)
      }
      if (!_.tList) { _.tList = [] }
      _.tList.unshift(id, pid || false, obs)
    }
  }
  return target
}
