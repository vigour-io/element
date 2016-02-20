'use strict'
var Event = require('vigour-js/lib/event')
var thunkRender = require('../element').Thunk.prototype.render
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

exports.on = {
  properties: {
    remove (val, event) {
      var element = this.parent
      if (!element.widget) {
        element.setKey('widget', {
          init () {
            this.vnode = thunkRender.call(this)
            return createElement(this.vnode)
          },
          update (previous, domNode) {
            var newTree = thunkRender.call(this, previous)
            patch(domNode, diff(previous.vnode, newTree))
            this.vnode = newTree
          },
          destroy () {
            var ev = new Event('remove')
            var elem = this.state.elem
            elem._on.removeEmitter.execInternal(elem, ev)
            ev.trigger()
          }
        }, event)
      }
      this.setKey('removeEmitter', val, event)
    }
  }
}
