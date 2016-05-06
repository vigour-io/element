'use strict'
const subscriber = require('./')
module.exports = function mergeSubscriber (target, val, id, parent) {
  if ('s' in val) { merge(target, val.s, 's') }
  if ('t' in val) { merge(target, val.t, 't') }
  if ('d' in val) { merge(target, val.d, 'd') }

  // clean this up as well try to find a way to remove cl
  if (val.cl) {
    const _ = target._
    if (!_.cl) { _.cl = {} }
    for (let id in val.cl) {
      _.cl[id] = val.cl[id]
    }
  }
}

function merge (target, val, type) {
  for (let id in val) {
    subscriber(target, val[id], type, id)
  }
}
