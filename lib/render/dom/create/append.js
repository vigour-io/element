'use strict'
module.exports = function appendNode (target, pnode, domNode) {
  if (target.isStatic) {
    let parent = target._parent
    if (!parent.isStatic) {
      let keys = parent.keys()
      let index = indexOf(keys, target.key)
      if (keys[index - 1]) {
        if (!parent[keys[index - 1]].isStatic) {
          target.staticOrder = pnode.children.length
          domNode.setAttribute('static-order', target.staticOrder)
        }
      }
      pnode.__order = target.__order
    }
    pnode.appendChild(domNode)
  } else if (!before(target, domNode, pnode)) {
    pnode.appendChild(domNode)
  }
}

function before (target, domNode, pnode) {
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
        if (nextChild.staticOrder !== void 0) {
          nextNode = findNodeByStaticOrder(pnode, nextChild.staticOrder)
        } else {
          if (nextChild.isStatic) {
            throw new Error('order - isStatic and no domIndex ' + nextChild.inspect())
          }
          console.error('state-order danger', nextChild.inspect())
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

function findNodeByStaticOrder (pnode, staticOrder) {
  var arr = pnode.children
  for (let i = 0, len = arr.length - 1;i < len; i++) {
    let j = staticOrder + i
    if (arr[j] && arr[j].getAttribute('static-order') == staticOrder) { //eslint-disable-line
      return arr[j]
    } else if (i !== 0) {
      j = staticOrder - i
      if (arr[j] && arr[j].getAttribute('static-order') == staticOrder) { //eslint-disable-line
        return arr[j]
      }
    }
  }
}
