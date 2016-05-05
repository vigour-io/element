'use strict'
module.exports = function parseId (uid, subs) {
  if (typeof uid === 'string' && uid[0] === 'c') {
    while (subs) {
      if (subs._) {
        if (subs._.c) {
          if (subs._.c[uid]) {
            return subs._.c[uid]
          }
        } else {
          throw new Error(`no _.c in parent subs this is fishy uid: "${uid}"`)
        }
      }
      subs = subs._.p
    }
  }
}
