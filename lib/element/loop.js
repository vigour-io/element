'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

module.exports = function renderLoop (element, uid, event) {
  if (!toRender[uid]) {
    console.log('start updates')
    console.time('updates')
    module.exports.progress = true
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
        module.exports.progress = null
        console.log('end updates')
        console.timeEnd('updates')
      })
    }
  }
}
