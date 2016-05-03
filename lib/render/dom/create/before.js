'use strict'
module.exports = function before (target, state, domNode, pnode, useCached) {
  const order = target.__order
  const index = pnode.__order
  if (index > order) {
    const parent = target.cParent()
    const keys = parent.keys(void 0, void 0, state)
    let i = lastIndex(keys, target.key)
    let nextChild
    let nextNode
    while ((nextChild = parent[keys[++i]])) {
      if (nextChild.isElement) {
        if (nextChild.domIndex !== void 0) {
          nextNode = findNodeByIndex(pnode, nextChild.domIndex)
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

function lastIndex (arr, val) {
  for (let i = arr.length; i > 0; i--) {
    if (arr[i] === val) {
      return i
    }
  }
}

function findNodeByIndex (pnode, domIndex) {
  var arr = pnode.children
  for (let i = 0, len = arr.length - 1;i < len; i++) {
    let j = domIndex + i
    if (arr[j] && arr[j].getAttribute('static-order') == domIndex) { //eslint-disable-line
      return arr[j]
    } else if (i !== 0) {
      j = domIndex - i
      if (arr[j] && arr[j].getAttribute('static-order') == domIndex) { //eslint-disable-line
        return arr[j]
      }
    }
  }
}
