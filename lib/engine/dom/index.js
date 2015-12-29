'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../element')
var render = require('./render')

module.exports = new Observable({
  properties: {
    node: function (val) {
      this._node = val
    }
  },
  define: {
    setKey (key, val) {
      var ret = Observable.prototype.setKey.apply(this, arguments)
      if (val instanceof Element) {
        render(val, this._node || document.body, Element)
      }
      return ret
    }
  }
}).Constructor
