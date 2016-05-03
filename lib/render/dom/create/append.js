'use strict'
const get = require('lodash.get')

module.exports = function appendNode (target, pnode, domNode, subs, tree, uid) {
  if (target.isStatic) {
    let parent = target._parent
    if (!parent.isStatic) {
      let keys = parent.keys()
      let index = indexOf(keys, target.key)
      if (keys[index - 1]) {
        if (!parent[keys[index - 1]].isStatic) {
          target.staticIndex = pnode.children.length
          domNode.setAttribute('data-static-index', target.staticIndex)
        }
      }
      pnode.__order = target.__order
    }
    pnode.appendChild(domNode)
  } else if (!before(target, domNode, pnode, subs, tree, uid)) {
    pnode.appendChild(domNode)
  }
}

function before (target, domNode, pnode, subs, tree, uid) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys()
    let i = lastIndexOf(keys, target.key)
    let nextChild
    let nextNode
    while ((nextChild = parent[keys[++i]])) {
      if (nextChild.isElement) {
        if (nextChild.staticIndex !== void 0) {
          nextNode = findNodeByStaticIndex(pnode, nextChild.staticIndex)
        } else {
          if (nextChild.isStatic) {
            throw new Error('order - isStatic and no staticIndex ' + nextChild.inspect())
          }
          console.error('state-order danger', nextChild.inspect(), uid)

          if (subs._.cl) {
            if (subs._.cl[uid]) {
              console.info('context linked list', uid)
              // also not good yet -- can have sutuyation with non-context to context
              nextNode = findNode(subs._.cl[uid], tree, nextChild)
            } else {
              nextNode = findNode(nextChild._uid, tree, nextChild)
            }
          } else {
            nextNode = findNode(nextChild._uid, tree, nextChild)
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

function findNode (uid, tree, nextChild) {
  const path = nextChild._$path
  if (path) {
    for (let i = path.length; i > 0; i--) {
      tree = tree._p
    }
    tree = get(tree, path)
    if (tree) {
      return tree._[uid]
    }
  } else if (nextChild.$) {
    return tree._p[nextChild.$]._[uid]
  } else {
    return tree._[uid]
  }
}

function lastIndexOf (arr, val) {
  for (let i = arr.length; i > 0; i--) {
    if (arr[i] === val) {
      return i
    }
  }
}

function indexOf (arr, val) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === val) {
      return i
    }
  }
}

function findNodeByStaticIndex (pnode, staticIndex) {
  var arr = pnode.children
  for (let i = 0, len = arr.length - 1;i < len; i++) {
    let j = staticIndex + i
    if (arr[j] && arr[j].getAttribute('data-static-index') == staticIndex) { //eslint-disable-line
      return arr[j]
    } else if (i !== 0) {
      j = staticIndex - i
      if (arr[j] && arr[j].getAttribute('data-static-index') == staticIndex) { //eslint-disable-line
        return arr[j]
      }
    }
  }
}
