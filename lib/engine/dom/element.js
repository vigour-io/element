'use strict'
var Observable = require('vigour-js/lib/observable')
var _remove = Observable.prototype.remove
var _addNewProperty = Observable.prototype.addNewProperty
var render = require('./render')

exports.define = {
  node: {
    get () {
      return this.getNode()
    }
  },
  getNode () {
    // console.log('.getNode', this.engine, this.path)
    return this.engine && this.engine.nodes[this.getHashedPath()]
  },
  getNodeDelete (block) {
    var node = this.getNode()
    if (node && !block) {
      // FIX IT FIX IT FIX IT!
      delete this.engine.nodes[this.getHashedPath()]
      var pnode = node.parentNode
      if (pnode) {
        pnode.removeChild(node)
      }
    }
  },
  remove () {
    this.getNodeDelete()
    return _remove.apply(this, arguments)
  },
  addNewProperty (key, val, property, event) {
    // use the prop for different engines with specific _Element types
    var ret = _addNewProperty.apply(this, arguments)
    if (this.engine) { // engine needs to be sort of the same as context
      let Element = this.engine._Element
      if (this[key] instanceof Element) {
        let node = this.getNode()
        if (node && !this.engine.nodes[this.getHashedPath()]) {
          render(this[key], node, Element, event, this.engine)
        }
      }
    }
    return ret
  }
}

exports.properties = {
  // *** CLONE NODE ***
  __node__: true // this is for doing stuff more efficiently , move all engine specific shit away!
}