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
  getNodeDelete (block, blocknode) {
    var node = this.getNode()
    if (node && !block) {
      // FIX IT FIX IT FIX IT!
      delete this.engine.nodes[this.getHashedPath()]
      var pnode = node.parentNode
      this.each(function (p) {
        if (p.getNodeDelete) {
          p.getNodeDelete(block, true)
        }
      })
      if (pnode && !blocknode) {
        pnode.removeChild(node)
      }
    }
  },
  // on: {
  //   remove () {
  //     this.getNodeDelete()
  //     // return _remove.apply(this, arguments)
  //   }
  // },
  remove () {
    if (this._input !== null) {
      this.getNodeDelete()
    }
    return _remove.apply(this, arguments)
  },
  addNewProperty (key, val, property, event) {
    // use the prop for different engines with specific _Element types
    var ret = _addNewProperty.apply(this, arguments)
    if (this.engine) { // engine needs to be sort of the same as context
      let Element = this.engine.ChildConstructor
      let val = this[key]
      if (val instanceof Element) {
        let node = this.getNode()
        if (node && !this.engine.nodes[val.getHashedPath()]) {
          render(val, node, Element, event, this.engine)
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

// exports.inject = require('../../event/browser')
