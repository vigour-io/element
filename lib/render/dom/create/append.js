'use strict'
const get = require('lodash.get')

module.exports = function appendNode (target, pnode, domNode, subs, tree, uid) {
  if (!pnode) {
    console.error(`no pnode in append! ${target.path().join('/')}`)
  } else {
    if (target.isStatic) {
      let parent = target._parent
      if (!parent.isStatic) {
        let keys = parent.keys()
        let index = target.index
        if (keys[index - 1]) {
          if (!parent[keys[index - 1]].isStatic) {
            target.staticIndex = pnode.children.length
            domNode._staticIndex = target.staticIndex
          }
        }
        pnode.__order = target.__order
      }
      pnode.appendChild(domNode)
    } else if (!before(target, domNode, pnode, subs, tree, uid)) {
      pnode.appendChild(domNode)
    }
  }
}

function before (target, domNode, pnode, subs, tree, uid) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys()
    let i = target.index
    let nextChild
    let nextNode
    const cl = subs._.cl
    while ((nextChild = parent[keys[++i]])) {
      if (nextChild.isElement) {
        if (nextChild.staticIndex !== void 0) {
          nextNode = findNodeByStaticIndex(pnode, nextChild.staticIndex)
        } else {
          if (nextChild.isStatic) {
            throw new Error('order - isStatic and no staticIndex ' + nextChild.inspect())
          } else {
            // here we need of course to combine sa and ta
            // console.error('lets order --->', subs._.ta)

            // how get rid of this?
            // if we have the info about the parents in here can we us it?
            // its a bit difficult though since we need to add a thing per uid
            // how to do
            // how to do or use the top level and find the key? -- thats also a possiblity ofc
            // it is less storage at least
            // dont need to make this different when we dont user this but a special keys array with uids
            nextNode = findNode(cl ? cl[uid] : nextChild._uid, tree, target, nextChild)
          }
        }
        if (nextNode) {
          pnode.insertBefore(domNode, nextNode)
          return true
        }
      }
    }
  }
  pnode.__order = order
}

function findNode (uid, tree, target, nextChild) {
  const len = target._$length
  if (len) {
    for (let i = len; i > 0; i--) {
      tree = tree._p
    }
  } else if (target.$ && target.$ !== true) {
    tree = tree._p
  }
  // if it cant find its no problem then it means something is wrong!
  if (nextChild._$length) {
    const resultTree = get(tree, nextChild.$)
    return resultTree && resultTree._[uid]
  } else if (nextChild.$ && nextChild.$ !== true) {
    return tree[nextChild.$] && tree[nextChild.$]._[uid]
  } else {
    return tree._[uid]
  }
}

function findNodeByStaticIndex (pnode, staticIndex) {
  var arr = pnode.childNodes
  for (let i = 0, len = arr.length; i < len; i++) {
    let j = staticIndex + i
    if (arr[j] && arr[j]._staticIndex === staticIndex) {
      return arr[j]
    } else if (i !== 0) {
      j = staticIndex - i
      if (arr[j] && arr[j]._staticIndex === staticIndex) {
        return arr[j]
      }
    }
  }
}
