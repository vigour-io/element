'use strict'

module.exports = function parseId (uid, subs) {
  if (typeof uid === 'string' && uid[0] === 'c') {
    console.log(subs)
    while(subs) {
      if (subs._.c && subs._.c[uid]) {
        return subs._.c[uid]
      }
      subs = subs._.p
    }
  }
}

// also needs to be able to look up

// function lookup
