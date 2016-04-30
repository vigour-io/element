'use strict'

// parent subs
module.exports = function subscriber (target, obs, type, uid) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      if (obs.s) { subscriber(target, obs, 's') }
      if (obs.t) { subscriber(target, obs, 't') }
      if (obs.d) { subscriber(target, obs, 'd') }
    } else {
      for (let uid in obs[type]) {
        subscriber(target, obs[type][uid], type, uid)
      }
    }
  } else {
    if (!uid) {
      uid = obs.uid()
    }
    if (!target._) { target._ = {} }
    if (!target._[type]) {
      target._[type] = {}
    }
    target._[type][uid] = obs
  }
  return target
}
