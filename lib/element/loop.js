'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

module.exports = function renderLoop (element, uid, event) {
  if (!toRender[uid]) {
    toRender[uid] = {
      raf: window.requestAnimationFrame(() => {
        var newTree, tree, patches
        var renderNode = element.renderNode
        // pass event to render when possible
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)
        patch(renderNode, patches)
        element.renderTree = newTree
        toRender[uid] = null
      })
    }
  }
}
