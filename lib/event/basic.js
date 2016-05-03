'use strict'
exports.inject = require('./')

exports.on = {
  properties: {
    move (val) {
      this.set({
        mousemove: val,
        touchmove: val
      }, false)
    },
    down (val) {
      this.set({
        mousedown: val,
        touchstart: val
      }, false)
    },
    up (val) {
      this.set({
        mouseup: val,
        touchend: val
      }, false)
    }
  }
}
