'use strict'
exports.define = {
  storeContext () {
    let arr = []
    let context = this._context
    let level = this._contextLevel
    let pcontext = this
    while (context) {
      arr.push(context, level, pcontext._contextKey || false)
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
    console.log(store.length)
    while (parent) {
      if (!cntxt) {
        cntxt = store[i]
        lvl = store[i + 1]
      }
      if (lvl === 1) {
        parent._context = cntxt
        parent._contextLevel = lvl
        if (store[i + 2]) {
          parent._contextKey = store[i + 2]
        }
        console.log(parent._path, lvl, cntxt._path)
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
