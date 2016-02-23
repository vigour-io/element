'use strict'
var thunkRender = require('../element').Thunk.prototype.render
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

exports.widget = {
  init () {
    this.vnode = thunkRender.call(this)
    return createElement(this.vnode)
  },
  update (previous, domNode) {
    var newTree = thunkRender.call(this, previous)
    patch(domNode, diff(previous.vnode, newTree))
    this.vnode = newTree
  }
}
