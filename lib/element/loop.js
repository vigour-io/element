'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var isNode = require('vigour-util/is/node')
var nextTick = isNode ? process.nextTick : global.requestAnimationFrame

module.exports = exports = function renderLoop (element, uid, event, nextstate, frames) {
  var myRender = toRender[uid]
  if (!myRender) {
    exports.progress = true
    myRender = toRender[uid] = {
      raf: nextTick(function () {
        var newTree, tree, patches
        var renderNode = element.renderNode
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)
        patch(renderNode, patches)
        element.renderTree = newTree
        toRender[uid] = null
        exports.progress = null
      })
    }
  }
}
