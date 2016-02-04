'use strict'

function keyStore (pcontext, level) {
  var pc = pcontext
  var keys
  while (level && pc) {
    if (pc._contextKey) {
      if (!keys) {
        keys = {}
      }
      keys[level] = pc._contextKey
    }
    pc = pc._parent
    level--
  }
  return keys
}

exports.define = {
  storeContext () {
    let arr = []
    let context = this._context
    let level = this._contextLevel
    let pcontext = this
    while (context) {
      arr.push(context, level, keyStore(pcontext, level))
      pcontext = context
      level = context._contextLevel
      context = context._context
    }
    return arr
  },
  applyContext (store) {
    let target = this
    var i = 0
    var parent = target
    var lvl
    var cntxt
    var keyStore
    while (parent) {
      if (!cntxt) {
        cntxt = store[i]
        lvl = store[i + 1]
        keyStore = store[i + 2]
      }
      if (keyStore && keyStore[lvl]) {
        parent._contextKey = keyStore[lvl]
      }
      if (lvl === 1) {
        parent._context = cntxt
        parent._contextLevel = lvl
        parent = cntxt
        i += 3
        if (i === store.length) {
          parent = null
        }
        cntxt = null
      } else {
        parent._context = cntxt
        parent._contextLevel = lvl
        parent = parent._parent
        lvl--
      }
    }
  }
}
