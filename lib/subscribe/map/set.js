'use strict'
const get = require('lodash.get')
module.exports = function set (val, map, path) {
  const len = path.length - 1
  if (len === 0) {
    map[path[0]] = val
    val._ = { p: map }
  } else {
    let m = map
    for (let i = 0; i < len; i++) {
      if (!m[path[i]]) {
        m[path[i]] = { _: { p: m } }
      }
      m = m[path[i]]
    }
    m[path[len]] = val
    val._ = { p: m }
  }
  return val
}
