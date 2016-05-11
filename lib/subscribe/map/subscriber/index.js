'use strict'
const context = require('./context')
const contextId = context.id
const contextOrder = context.order
module.exports = function subscriber (target, obs, type) {
  const _ = target._
  var store = _[type] || (_[type] = {})
  var pid, id
  if (obs.__c) {
    const parent = getParent(obs.cParent())
    id = contextId(obs)
    pid = parent.__c ? contextId(parent) : parent.uid()
    if (obs.isElement) { contextOrder(_, id, obs, parent) }
  } else {
    id = obs.uid()
    const parent = getParent(obs._parent)
    pid = parent && parent.uid()
  }
  console.log('%csubscriber: '+id, 'background: #222; color: white', type, store[id])
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

function getParent (parent) {
  while (parent) {
    if (parent.isElement) {
      return parent
    }
    parent = parent.cParent()
  }
}