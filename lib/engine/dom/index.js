'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../element')
var render = require('./render')
module.exports = new Observable({
  properties: {
    node (val) {
      this._node = val
    },
    nodes: true,
    domEngine: { val: true } // for later now we use global.engine
  },
  inject: require('vigour-js/lib/base/uid/hash'),
  define: {
    generateConstructor () {
      return function DomEngine () {
        global.engine = this // DIRTY!
        this.nodes = {}
        return Observable.apply(this, arguments)
      }
    },
    setKey (key, val, event) {
      var ret = Observable.prototype.setKey.apply(this, arguments)
      if (val instanceof Element) {
        render(val, this._node || document.body, Element, event)
      }
      return ret
    }
  }
}).Constructor
