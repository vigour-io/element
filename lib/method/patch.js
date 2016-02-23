'use strict'
var renderLoop = require('../element/loop')

exports.define = {
  patch (event, nextstate, frames) {
    var parent = this
      // passing a nextstate, will queue an extra patch
    if (nextstate) {
      while (parent) {
        parent = parent.parent
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, event, nextstate, frames)
          return
        }
      }
      throw new Error('using next on patch cannot find rendertree, please fix, call 911')
    } else {
      while (parent) {
        if (parent._context && parent._lstamp === event.stamp && renderLoop.progress) {
          return
        }
        if (!parent._force) {
          parent._lstamp = event.stamp
        }
        if (parent.renderTree) {
          renderLoop(parent, parent.uid, event)
          return
        }
        parent = parent.parent
      }
    }
  }
}
