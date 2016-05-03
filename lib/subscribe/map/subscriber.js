'use strict'
const cid = require('../../context/id')
// parent subs
module.exports = function subscriber (target, obs, type, uid) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      if (obs.s) { subscriber(target, obs, 's') }
      if (obs.t) { subscriber(target, obs, 't') }
      if (obs.d) { subscriber(target, obs, 'd') }
      // clean this up a bit
      if (obs.c) {
        console.log('COPY CONTEXT', obs)
        if (!target._.c) {
          target._.c = {}
        }
        for (let uid in obs.c) {
          target._.c[uid] = obs.c[uid]
        }
      }
      // clean this up as well
      if (obs.cl) {
        console.log('COPY CONTEXT LINKED LIST', obs)
        if (!target._.cl) {
          target._.cl = {}
        }
        for (let uid in obs.cl) {
          target._.cl[uid] = obs.cl[uid]
        }
      }
    } else {
      for (let uid in obs[type]) {
        subscriber(target, obs[type][uid], type, uid)
      }
    }
  } else {
    if (!target._) { target._ = {} }
    if (!uid) {
      if (obs.__c) {
        uid = cid(obs)
        const parent = obs.cParent()
        if (!target._.c) {
          target._.c = {}
        }
        target._.c[uid] = parent.__c ? cid(parent) : parent.uid()
        const keys = parent.keys()
        const index = indexOf(keys, obs.key)
        let nextChild = parent[keys[index + 1]]
        if (
          nextChild.isElement &&
          nextChild.__c &&
          (!target._.cl || !target._.cl[uid]) &&
          isNotStatic(nextChild)
        ) {
          if (!target._.cl) {
            target._.cl = {}
          }
          target._.cl[uid] = cid(nextChild)
        }
      } else {
        uid = obs.uid()
      }
    }
    if (!target._[type]) {
      target._[type] = {}
    }
    target._[type][uid] = obs
  }
  return target
}

// this will become .index on the element (much easier)
// THIS NEEDS TO GO! -- keys will store indexes (so we dont need to go trough lists)
function indexOf (arr, val, elem) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === val) {
      return i
    }
  }
}

// THIS NEEDS TO GO! this is extremely slow ofcoure
function isNotStatic (obs) {
  return obs.isStatic ? void 0 : obs.$ ? true : obs.each(isNotStatic)
}
