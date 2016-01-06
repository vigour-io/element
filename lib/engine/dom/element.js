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
    return this.engine && this.engine.nodes[this.getHashedPath()]
  },
  getNodeDelete (block, blocknode, hashed) {
    var node = this.getNode()
    if (node && !block) {
      // FIX IT FIX IT FIX IT!
      delete this.engine.nodes[this.getHashedPath()]
      var pnode = node.parentNode
      var engine = this.engine
      this.each(function (p) {
        if (p.getNodeDelete) {
          p.getNodeDelete(block, true)
        }
      }, function (prop) {
        return prop instanceof engine.ChildConstructor
      })
      if (pnode && !blocknode) {
        pnode.removeChild(node)
      }
    }
  },
  killerRemove () {

  },
  remove () {
    if (this._input !== null) {
      this.getNodeDelete()
      // remove all contexts and instances -- should be fine
      // walk context map
      // think about this

      // if (this.getInstances()) {
      //   for (var i in this._instances) {
      //     // needs to do more
      //     this._instances[i].getNodeDelete()
      //   }
      // }
      // utlra dirty but need this
      // if (this._contextMap) {
      //   let engine = this.engine
      //   walk(this._contextMap)
      //   function walk (obj) {
      //     for(var i in obj) {
      //       if(i === 'val') {
      //         let id = obj[i]
      //         let node = app.nodes[id]
      //         if (node) {
      //           let pnode = node.parentNode
      //           if (pnode) {
      //             pnode.removeChild(node)
      //           }
      //           delete app.nodes[id]
      //         }
      //       } else {
      //         walk(obj[i])
      //       }
      //     }
      //   }
      // }
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
