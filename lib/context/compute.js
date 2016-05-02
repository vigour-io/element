'use strict'

module.exports = function (obs, uid, subs) {
  if (typeof uid === 'string' && uid[0] === 'c') {
    // console.error('CONTEXT!!!', subs, uid)
    if (subs._.c && subs._.c[uid]) {
      // may need to store more!
      return subs._.c[uid]
    } else {
      const p = obs.cParent()
      return p.uid()
    }
  }
}
