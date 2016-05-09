'use strict'
module.exports = function mergeS (a, b) {
  // console.error('LOL', '\n    A:', a, '\n    B:', b)
  if (b.t) {
    for (let uid in b.t) {
      if (!a.t[uid]) {
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
      if (a.s[uid]) {
        console.error('oopsie wrong case in mergeSubs s', uid)
      }
      a.s[uid] = b.s[uid]
    }
    a.sList = a.sList ? a.sList.concat(b.sList) : b.sList
    a.tList = a.tList ? a.tList.concat(b.tList) : b.tList
  }

  if (b.d) {
    for (let uid in b.d) {
      if (a.d[uid]) {
        console.error('oopsie wrong case in mergeSubs d', uid)
      }
      a.d[uid] = b.d[uid]
    }
    a.sList = a.sList ? a.tList.concat(b.sList) : b.sList
  }

  if (b.cl) {
    if (!a.cl) { a.cl = {} }
    for (let id in b.cl) {
      a.cl[id] = b.cl[id]
    }
  }
}
