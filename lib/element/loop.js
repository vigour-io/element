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
        console.time('do render')
        newTree = element.render()
        console.timeEnd('do render')
        tree = element.renderTree
        console.time('do diff')
        patches = diff(tree, newTree)
        console.log('patches', patches)
        console.timeEnd('do diff')
        patch(renderNode, patches)
        element.renderTree = newTree
        toRender[uid] = null
        exports.progress = null

        let myline = timeline[uid]
        if (myline) {
          let keyframe = myline[0]
          let next = keyframe
          myline.shift()
          if (next) {
            let event = new Event('next')
            for (let i = next.length - 1; i >= 0; i--) {
              let state = next[i]
              state.elem.apply(state).patch(event)
            }
          } else if (myline.length) {
            renderLoop(element, uid)
          }
        }
      })
    }
  }
  if (nextstate) {
    addToTimeline(uid, nextstate, frames)
  }
}