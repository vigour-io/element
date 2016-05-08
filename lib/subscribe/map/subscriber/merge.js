'use strict'
module.exports = function mergeS (a, b) {
  // console.error('LOL', '\n    A:', a, '\n    B:', b)
  if (b.t) {
    for (let uid in b.t) {
      if (!a.t[uid]) {
        // console.log('T - NEW LETS ADD!')
      } else {
        console.error('oopsie wrong case in mergeSubs t', uid)
      }
      a.t[uid] = b.t[uid]
    }
    if (!b.s) {
      a.tList = a.tList ? a.tList.concat(b.tList) : b.tList
    }
  }

  if (b.s) {
    for (let uid in b.s) {
      if (!a.s[uid]) {
        // console.log('T - NEW LETS ADD!')
      } else {
        console.error('oopsie wrong case in mergeSubs s', uid)
      }
      a.s[uid] = b.s[uid]
    }
    a.sList = a.sList ? a.sList.concat(b.sList) : b.sList
    a.tList = a.tList ? a.tList.concat(b.tList) : b.tList
  }

  // same for done

  if (b.cl) {
    if (!a.cl) { a.cl = {} }
    for (let id in b.cl) {
      a.cl[id] = b.cl[id]
    }
  }
}
