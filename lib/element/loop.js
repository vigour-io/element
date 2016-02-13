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
        console.time('do render')
        newTree = element.render()
        console.timeEnd('do render')

        tree = element.renderTree
        console.time('do diff')
        patches = diff(tree, newTree)
        console.timeEnd('do diff')

        console.log(newTree, patches)

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
