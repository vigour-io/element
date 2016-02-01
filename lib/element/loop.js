'use strict'
var toRender = {}
var cbGlob = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

// has to become ultra efficient
module.exports = function renderLoop (element, uid, cb) {
  if (cb) {
    cbGlob[uid] = cb
  }
  if (!toRender[uid]) {
    toRender[uid] = window.requestAnimationFrame(() => {
      var newTree = element.render()
      var tree = element.renderTree
      var renderNode = element.renderNode
      var patches = diff(tree, newTree)
      patch(renderNode, patches)
      element.renderTree = newTree
      if (cbGlob[uid]) {
        cbGlob[uid].call(element, renderNode, newTree)
      }
      toRender[uid] = null
    })
  }
}
