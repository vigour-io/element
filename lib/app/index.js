'use strict'

require('./raf')
var Observable = require('vigour-js/lib/observable')
var Element = require('../element')
var doc = require('../document')
var nodeProperty = Element.prototype.properties.node
var count = 0


var app = new Element({
  key: 'app',
  on: {
    new: {
      app (a, b, c) {
        doc.setKey('app' + (count++ || ''), this)
      }
    },
    remove () {
      var rafId = this._rafId
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  },
  properties: {
    node (node) {
      nodeProperty.call(this, node)
      this._rafId = window.requestAnimationFrame(() => {
        let node = this._node
        this.set({
          width: node.clientWidth,
          height: node.clientHeight
        })
        this._rafId = null
      })
    },
    width: Observable,
    height: Observable,
    rendered: true
  },
  width: 0,
  height: 0,
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
