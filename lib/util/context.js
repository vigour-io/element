'use strict'
exports.define = {
  storeContext () {
    let arr = []
    let context = this._context
    let level = this._contextLevel
    while (context) {
      arr.push(context, level)
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
    while (parent) {
      if (!cntxt) {
        cntxt = store[i]
        lvl = store[i + 1]
      }
      if (lvl === 1) {
        parent._context = cntxt
        parent._contextLevel = lvl
        // console.log(parent._path, lvl, cntxt._path)
        parent = cntxt
        i += 2
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
