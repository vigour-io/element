'use strict'
var renderLoop = require('./loop')
var Observable = require('vigour-js/lib/observable')
var _set = Observable.prototype.set
var _remove = Observable.prototype.remove
// get morwe base stuff here!

exports.define = {
  patch: function () {
    // if (!renderLoop.inProgress) {
      // this has to become super efficient
    var parent = this
    while (parent) {
      if (parent.renderTree) {
        // so we check is it rendering current ly
        // if no we do a patch (patches are also badged ofc)
        // 2 patches is rly rly good for the time instead of wicked
        //tree and node thats it
        // then another add patch
        // context is ofc wrong...
        // also needs data attached
        console.log('PATCHER', this.path) // make this more efficient
        renderLoop(parent, parent.uid)
        return
      }
      parent = parent.parent
    }
    // }
  },
  set (val, event) {
    var changed = _set.apply(this, arguments)
    if (changed) {
      this.patch()
    }
    return changed
  },
  remove () {
    this.patch()
    return _remove.apply(this, arguments)
  }
}

  // on: {
  //   data () {
  //     this.patch()
  // rather not! ha
  // just do whgen set -- if instance then do ---xxxx
  //   }
  // },