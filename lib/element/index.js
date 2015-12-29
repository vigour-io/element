'use strict'
var Observable = require('vigour-js/lib/observable')
var globals = require('../engine/dom/globals')
var contextsNodes = globals.cnodes
var nodes = globals.nodes
var _addNewProperty = Observable.prototype.addNewProperty
var _remove = Observable.prototype.remove
var render = require('../engine/dom/render')

var Element = new Observable({
  trackInstances: true,
  define: {
    getNode () {
      if (this._context) {
        let cnode = contextsNodes[this._context.uid] // switch context and other
        // take multi case into account importante! now you can have probles
          // DIRT! for now just use path.join('.')
        if (this._context._context) {
          cnode = contextsNodes[this._context._context.uid]
          if (cnode && cnode[this._context.uid]) {
            return cnode[this._context.uid][this.uid]
          }
        } else if (cnode) {
          return cnode[this.uid]
        }
      } else {
        return nodes[this.uid] // this._node
      }
    },
    getNodeDelete () {
      var node
      if (this._context) {
        let cnode = contextsNodes[this._context.uid] // switch context and other
        // take multi case into account importante! now you can have probles
          // DIRT! for now just use path.join('.')
        if (this._context._context) {
          cnode = contextsNodes[this._context._context.uid]
          if (cnode && cnode[this._context.uid]) {
            node = cnode[this._context.uid][this.uid]
          }
        } else if (cnode) {
          node = cnode[this.uid]
          if (node) {
            delete nodes[this.uid]
          }
        }
      } else {
        node = nodes[this.uid] // this._node
        if (node) {
          delete nodes[this.uid]
        }
      }
      if (node) {
        if (contextsNodes[this.uid]) {
          delete contextsNodes[this.uid]
        }
        node.parentNode.removeChild(node)
      }
    },
    remove () {
      this.getNodeDelete()
      return _remove.apply(this, arguments)
    }
  },
  useVal: true,
  inject: [
    require('../property/dom')
  ],
  ChildConstructor: 'Constructor'
}).Constructor

Element.prototype.define({
  addNewProperty (key, val) {
    // only do this when event
    // console.log(key, val)
    var ret = _addNewProperty.apply(this, arguments)
    if (this[key] instanceof Element) {
      // for each komt zo
      let node = this.getNode()
      if (node) {
        render(this[key], node, Element)
        console.log('yo yo yo', key)
      }
    }
    return ret
  }
})

module.exports = Element
