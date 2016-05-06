'use strict'
const set = require('lodash.set')
// const get = require('lodash.get')
// module.exports = function set (val, map, subs) {
//   const len = subs.length - 1
//   if (len === 0) {
//     if (map[subs[0]]) {
//       console.error('wrong!')
//     }
//     map[subs[0]] = val
//     return val
//   } else {
//     let m = map
//     for (let i = 0; i < len; i++) {
//       if (!map[subs[i]]) {
//         m[subs[i]] = { _: { p: m } }
//       } else {
//         if (!m[subs[i]]._) {
//           m[subs[i]]._ = { p: m }
//         } else if (m[subs[i]]._.p !== m) {
//           m[subs[i]]._.p = m
//         }
//       }
//       m = m[subs[i]]
//     }
//     m[subs[len]] = val
//     if (!val._) {
//       val._ = { p: m }
//     } else if (val._.p !== m) {
//       return val
//     }
//   }
// }

module.exports = function setSubs (val, map, subs) {
  // so majesctly inneficient
  set(map, subs, val)
  let m = map
  for (var i in subs) {
    if (!m[subs[i]]._) {
      m[subs[i]]._ = { p: m }
    } else if (m[subs[i]]._.p !== m) {
      m[subs[i]]._.p = m
    }
    m = m[subs[i]]
  }
  return val
}
