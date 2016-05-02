'use strict'
const getParent = require('./parent')
const noState = require('../nostate')
const props = noState.property
const elems = noState.element

const renderElement = require('vigour-util/is/node')
? function renderElement (target, type, stamp, subs, tree, uid) {
  var div = document.createElement(target.node)
  props(target, type, stamp, subs, tree, div)
  elems(target, type, stamp, subs, tree, div)
  if (!target.noState) { tree._[uid] = div }
  return div
}
: function renderElement (target, type, stamp, subs, tree, uid) {
  const noState = target.noState
  var div
  if (noState === true && target._cachedNode) {
    div = target._cachedNode.cloneNode(true)
  } else {
    if (target._cachedNode) {
      div = tree._[uid] = target._cachedNode.cloneNode(false)
    } else {
      div = document.createElement(target.node)
      let noStateProps = props(target, type, stamp, subs, tree, div)
      if (noState || noStateProps) {
        target._cachedNode = div
      }
      if (!noState) {
        tree._[uid] = div
      }
    }
    elems(target, type, stamp, subs, tree, div)
  }
  return div
}

module.exports = function createElement (target, state, type, stamp, subs, tree, pnode, uid) {
  const domNode = renderElement(target, type, stamp, subs, tree, uid)
  if (!pnode) {
    pnode = getParent(target, state, type, stamp, subs, tree, uid)
  }
  if (pnode) {
    if (!insertBefore(target, state, domNode, pnode, tree, subs, uid)) {
      pnode.appendChild(domNode)
    }
  }
  if (target.hasEvents) {
    if (state) {
      domNode._s = state
    }
    domNode._ = target
  }
  return domNode
}

const computeId = require('../../context/compute')

function insertBefore (target, state, domNode, pnode, tree, subs, uid) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys()
    let i = keys.lastIndexOf(target.key)
    let nextChild
    let nextNode
    console.log('keys:', keys, target.key)
    while ((nextChild = parent[keys[++i]])) {
      console.log('- check:', keys[i])
      nextNode = nextChild._cachedNode
      // if (nextChild.noState) {
      //   console.log('static')
      // } else {
      //   console.log('state', target.key, nextNode)
      // }
      if (nextNode) {
        console.log( 'nextNode!', tree._)

        // if (tree._) {
        //   for(var i in tree._) {
        //     console.log('>', i, tree._[i] === nextNode)
        //   }
        // }
        // console.log('??',tree._p[nextChild.$] && tree._p[nextChild.$]._[nextChild.uid()])
        // console.log(tree, nextChild.uid(), tree._p[nextChild.$], uid)//computeId(nextChild, nextChild.uid(), subs))
        var parentNode = nextNode.parentNode
        if (pnode === parentNode) {
          pnode.insertBefore(domNode, nextNode)
        } else {
          console.log('uid:', nextChild.uid(), nextChild.path(), target.path())
          console.log('my tree >>>', tree._)
          console.log('p tree >>>>', tree._p._)
        }
        return true
      }
    }
  }
  pnode.__order = order
  // if (index > order) {
  //   // uids ---
  //   const parent = target.cParent()
  //   const keys = parent.keys()
  //   // let's perf test this one
  //   let i = keys.lastIndexOf(target.key)
  //   let nextChild
  //   let nextNode

  //   while ((nextChild = parent[keys[++i]])) {
  //     nextNode = nextChild._cachedNode
  //     if (nextChild.noState) {
  //       console.log('static')
  //     } else {
  //       console.log('state')
  //     }
  //   }
  // }
  // pnode.__order = order
}

// function getNodeIndex (pnode, node) {
//   for (let arr = pnode.children, i = 0, len = arr.length; i < len; i++) {
//     if (arr[i] === node) {
//       return i
//     }
//   }
// }
