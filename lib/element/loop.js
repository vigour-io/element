'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var cbx

module.exports = function renderLoop (element, uid, cb) {
  cbx = cb
  if (!toRender[uid]) {
    toRender[uid] = {
      raf: window.requestAnimationFrame(() => {
        var newTree, tree, patches
        var renderNode = element.renderNode
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)
        patch(renderNode, patches)
        element.renderTree = newTree
        toRender[uid] = null
        if (cbx) {
          cbx()
        }
      })
    }
  }
}
