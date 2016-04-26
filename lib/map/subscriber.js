'use strict'

module.exports = function subscriber (target, obs, type) {
  if (typeof obs === 'object' && !obs._base_version) {
    if (!type) {
      for (let type in obs) {
        subscriber(target, obs, type)
      }
    } else {
      for (let uid in obs[type]) {
        subscriber(target, obs[type][uid], type)
      }
    }
  } else {
    if (!target._) { target._ = {} }
    if (!target._[type]) {
      target._[type] = {}
    }
    target._[type][obs.uid()] = obs
  }
  return target
}
