'use strict'

var Observable = require('vigour-js/lib/observable')
var Element = require('../element')
var doc = require('../document')
var count = 1

var app = new Element({
  on: {
    new: {
      app (a, b, c) {
        doc.setKey('app' + count++, this)
        this._rafId = window.requestAnimationFrame(() => {
          let node = this._node
          this.set({
            width: node.clientWidth,
            height: node.clientHeight
          })
          this._rafId = null
        })
      }
    },
    remove () {
      var rafId = this._rafId
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  },
  properties: {
    width: new Observable(),
    height: new Observable(),
    rendered: new Observable()
  },
  define: {
    _count: {
      value: 1,
      writable: true
    }
  },
  rendered: true
})

module.exports = app.Constructor

window.onresize = function () {
  var apps = app._instances
  for (var i = apps.length - 1; i >= 0; i--) {
    let app = apps[i]
    let node = app._node
    if (node) {
      app.set({
        width: node.clientWidth,
        height: node.clientHeight
      })
    }
  }
}
