'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../element')
var render = require('./render')
module.exports = new Observable({
  properties: {
    node (val) {
      this._node = val
    },
    contextMap: true,
    nodes: true,
    domEngine: { val: true }
  },
  inject: require('vigour-js/lib/base/uid/hash'),
  define: {
    generateConstructor () {
      return function DomEngine () {
        global.engine = this // DIRTY!
        this.nodes = {}
        this.contextNodes = {} // add this later
        return Observable.apply(this, arguments)
      }
    },
    setKey (key, val, event) {
      var ret = Observable.prototype.setKey.apply(this, arguments)
      if (val instanceof Element) {
        render(val, this._node || document.body, Element, event)
      }
      return ret
    },
    getRendered (path) {
      var rendered = this
      var restores = []
      for (let i = 0, length = path.length; i < length; i++) {
        restores.push([ rendered._contextLevel, rendered._context ])
        rendered = rendered[path[i]]
      }
      // this can also use shit from the hash map needs to be able to get rendered based on hashmap anyways
      // dom node use it for path storage as well -- may be super nice
      return [ rendered, restores ]
    }
  }
}).Constructor
