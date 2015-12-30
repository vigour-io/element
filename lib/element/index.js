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
    node: {
      get () {
        return nodes[this.path.join('.')]
      }
    },
    getNode () {
      return nodes[this.path.join('.')]
    },
    getNodeDelete (block) {
      // var node
      // if (this._context) {
      //   let cnode = contextsNodes[this._context.uid] // switch context and other
      //   // take multi case into account importante! now you can have probles
      //     // DIRT! for now just use path.join('.')
      //   if (this._context._context) {
      //     cnode = contextsNodes[this._context._context.uid]
      //     if (cnode && cnode[this._context.uid]) {
      //       node = cnode[this._context.uid][this.uid]
      //     }
      //   } else if (cnode) {
      //     node = cnode[this.uid]
      //     if (node) {
      //       delete nodes[this.uid]
      //     }
      //   }
      // } else {
      //   node = nodes[this.uid] // this._node
      //   if (node) {
      //     delete nodes[this.uid]
      //   }
      // }
      var node = this.getNode()
      if (node && !block) {
        // if (contextsNodes[this.uid]) {
        //   delete contextsNodes[this.uid]
        // }
        // delete nodes[this.path.join('.')]
        var pnode = node.parentNode
        if (pnode) {
          pnode.removeChild(node)
        }
        // node.parentNode.removeChild(node)
      }
    },
    remove () {
      console.log(this._path.join('.'))
      this.getNodeDelete()
      return _remove.apply(this, arguments)
    }
  },
  useVal: true,
  inject: [
    require('../property/dom'),
    require('./operator'),
    require('../event')
  ],
  ChildConstructor: 'Constructor'
}).Constructor

Element.prototype.define({
  addNewProperty (key, val) {
    if (!key) {
      console.error('this is major screwed!', this.path.join('.'), this, val)
    }
    var ret = _addNewProperty.apply(this, arguments)
    if (this[key] instanceof Element) {
      let node = this.getNode()
      if (node && !nodes[this[key].path.join('.')]) {
        render(this[key], node, Element)
      }
    }
    return ret
  }
})

module.exports = Element
