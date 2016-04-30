'use strict'

// parent subs
module.exports = function subscriber (target, obs, type, uid) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      for (let type in obs) {
        if (type !== '_parent') {
          subscriber(target, obs, type)
        }
      }
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
