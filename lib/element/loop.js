'use strict'
var toRender = {}
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

// make a sync path thing
// rly important to not do to many paths
// has to become ultra efficient
module.exports = function renderLoop (element, uid, path) {

    // have to use
    /*
    var VNode = require('virtual-dom/vnode/vnode');
    var VText = require('virtual-dom/vnode/vtext');
    // will be a lot faster...
    function render(data) {
        return new VNode('div', {
            className: "greeting"
        }, [
            new VText("Hello " + String(data.name))
        ]);
    }
    create your own patch
    module.exports = render;
    */

  // this has to become ultra optimized -- tha walker has to ultra smart

  if (!toRender[uid]) {
    toRender[uid] = {
      path: path,
      raf: window.requestAnimationFrame(() => {
        var newTree, tree, patches
        // var path = toRender[uid].path
        var renderNode = element.renderNode
        // find way back in deep? pretty annoying
        // if (path && path.length > element.path.legnth) {
        //   console.log('USE path', path)
        //   let nest = element.get(path.reverse())
        //   console.log(path)
        //   let patchx = nest.render()
        //   let targetnode = pathfinder(renderNode, path)
        //   // find node
        // } else {
        newTree = element.render()
        tree = element.renderTree
        patches = diff(tree, newTree)

        // console.log(patches) //create own patches directly
        patch(renderNode, patches)
        element.renderTree = newTree
        // }
        // var newTree = element.render()
        // var tree = element.renderTree
        // console.log(tree, newTree, patches)
        toRender[uid] = null
      })
    }
  } else {
    // has       console.log('--->', val)
    // if (path) {
      // console.error('!!!find common ancestor!!! NEED TO MAKE', path, 'vs', toRender[uid].path)
      // toRender[uid].path = null
    // }
  }
}

// function pathfinder (vnode, path) {
//   let t = vnode
//   for (var i in path) {
//     console.log(path[i])
//   }
// }
