'use strict'
const cid = require('../../context/id')
// parent subs
module.exports = function subscriber (target, obs, type, uid) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      if (obs.s) { subscriber(target, obs, 's') }
      if (obs.t) { subscriber(target, obs, 't') }
      if (obs.d) { subscriber(target, obs, 'd') }
      if (obs.c) {
        console.log('COPY CONTEXT', obs)
        if (!target._.c) {
          target._.c = {}
        }
        for (let uid in obs.c) {
          target._.c[uid] = obs.c[uid]
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
        let parent = obs.cParent()
        if (!target._.c) {
          target._.c = {}
        }
        target._.c[uid] = parent.__c ? cid(parent) : parent.uid()
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
