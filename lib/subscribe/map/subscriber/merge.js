'use strict'
const subscriber = require('./')
module.exports = function mergeSubscriber (target, obs, id, parent) {
  if (obs.s) { merge(target, obs, 's') }
  if (obs.t) { merge(target, obs, 't') }
  if (obs.d) { merge(target, obs, 'd') }

  // clean this up as well try to find a way to remove cl
  if (obs.cl) {
    if (!target._.cl) {
      target._.cl = {}
    }
    for (let id in obs.cl) {
      target._.cl[id] = obs.cl[id]
    }
  }
}

function merge (target, obs, type) {
  for (let id in obs[type]) {
    subscriber(target, obs[type][id], type, id)
  }
}
