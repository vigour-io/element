'use strict'
var renderLoop = require('./loop')
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set

exports.define = {
  patch: function () {
    // forget about cb path will carry an object
    var parent = this

    // var p = []
    // make this a lot faster as well!
    while (parent) {
      // if (parent.key) {
        // p.push(parent.key)
      // }
      if (parent.renderTree) {
        renderLoop(parent, parent.uid)
        return
      }
      parent = parent.parent
    }
  },
  set (val, event) {
    var changed = _set.apply(this, arguments)
    if (changed) {
      // this.patch()
    }
    return changed
  }
}

  // on: {
  //   data () {
  //     this.patch()
  // rather not! ha
  // just do whgen set -- if instance then do ---xxxx
  //   }
  // },