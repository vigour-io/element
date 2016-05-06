'use strict'
const subscriber = require('./subscriber')
module.exports = function mergeSubscriber (target, obs, type, id, parent) {
  if (!type) {
    if (obs.s) { subscriber(target, obs, 's') }
    if (obs.t) { subscriber(target, obs, 't') }
    if (obs.d) { subscriber(target, obs, 'd') }
    // clean this up a bit
    if (obs.c) {
      if (!target._.c) {
        target._.c = {}
      }
      for (let id in obs.c) {
        target._.c[id] = obs.c[id]
      }
    }
    // clean this up as well
    if (obs.cl) {
      if (!target._.cl) {
        target._.cl = {}
      }
      for (let id in obs.cl) {
        target._.cl[id] = obs.cl[id]
      }
    }
  } else {
    for (let id in obs[type]) {
      subscriber(target, obs[type][id], type, id)
    }
  }
}
