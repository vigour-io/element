'use strict'

module.exports = function parseId (obs, uid, subs) {
  if (typeof uid === 'string' && uid[0] === 'c') {
    if (subs._.c && subs._.c[uid]) {
      return subs._.c[uid]
    } else {
      const p = obs.cParent()
      return p.uid()
    }
  }
}
