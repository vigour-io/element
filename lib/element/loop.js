'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var Event = require('vigour-js/lib/event')
// frame = 1 ===> timeline === [[next]]
// frame = 6 ===> timeline === [5, [next]]
var timeline = {}

function addToTimeline (uid, next, frames) {
  var frame = frames ? frames - 1 : 0
  if (!timeline[uid]) {
    timeline[uid] = []
  }
  let keyframe = timeline[uid][keyframe]
  if (keyframe) {
    keyframe.push(next)
  } else {
    timeline[uid][frame] = [next]
  }
}

module.exports = exports = function renderLoop (element, uid, event, nextstate, frames) {
  var myRender = toRender[uid]
  if (!myRender) {
    exports.progress = true
    myRender = toRender[uid] = {
      raf: global.requestAnimationFrame(function () {
        var newTree, tree, patches
        var renderNode = element.renderNode
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)
        console.info(patches)
        patch(renderNode, patches)
        element.renderTree = newTree
        toRender[uid] = null
        exports.progress = null
      })
    }
  }
  if (nextstate) {
    addToTimeline(uid, nextstate, frames)
  }
}
