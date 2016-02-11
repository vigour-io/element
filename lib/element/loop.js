'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var Event = require('vigour-js/lib/event')

module.exports = exports = function renderLoop (element, uid, event, next) {
  var myRender = toRender[uid]
  if (!myRender) {
    exports.progress = true
    myRender = toRender[uid] = {
      raf: global.requestAnimationFrame(function () {
        console.info('do update!')
        var newTree, tree, patches
        var renderNode = element.renderNode
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)
        patch(renderNode, patches)
        element.renderTree = newTree
        let next = myRender.next
        toRender[uid] = null
        exports.progress = null
        if (next) {
          let event = new Event('nextRender')
          for (let i = next.length - 1; i >= 0; i--) {
            next[i].elem.apply(next[i]).patch(event)
          }
        }
      })
    }
  }
  if (next) {
    if (!myRender.next) {
      myRender.next = [next]
    } else {
      myRender.next.push(next)
    }
  }
}
