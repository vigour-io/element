'use strict'
var Observable = require('vigour-js/lib/observable')
var _addNewProperty = Observable.prototype.addNewProperty
var _remove = Observable.prototype.remove
var render = require('../engine/dom/render')

var Element = new Observable({
  trackInstances: true,
  define: {
    node: {
      get () {
        return this.getNode()
      }
    },
    getNode () {
      // if (this._context) {
      //   let cmap = this._context && this.contextMap(global.engine.contextNodes)[this.uid]
      //   return cmap && cmap.node
      // } else {
      return global.engine.nodes[this.getHashedPath()] // alles kan nu op de map gwn
      // }
    },
    getEngine () {
      // needs clean up for multiple super DIRTY!
      return global.engine
    },
    getNodeDelete (block) {
      var node = this.getNode()
      if (node && !block) {
        // observable.contextMap(global.engine.contextNodes)
        delete global.engine[this.getHashedPath()]
        var pnode = node.parentNode
        if (pnode) {
          pnode.removeChild(node)
        }
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
    require('vigour-js/lib/base/uid/hash'),
    require('../property/dom'),
    require('./operator'),
    require('../event/click'),
    require('../event')
  ],
  ChildConstructor: 'Constructor'
}).Constructor

Element.prototype.define({
  addNewProperty (key, val, property, event) {
    if (!key) {
      console.error('this is major screwed!', this.path.join('.'), this, val, property)
    }
    var ret = _addNewProperty.apply(this, arguments)
    if (this[key] instanceof Element) {
      let node = this.getNode()
      if (node && !nodes[this[key].path.join('.')]) {
        console.log('event:', event)
        render(this[key], node, Element, event)
      }
    }
    return ret
  }
})

module.exports = Element
