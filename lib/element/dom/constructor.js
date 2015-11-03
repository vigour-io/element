'use strict'

var Observable = require('vigour-js/lib/observable')
var derivedObservable = Observable.prototype.generateConstructor()

exports.define = {
  generateConstructor: function () {
    return function DerivedElement (val, event, parent, key) {
      if (this._node) {
        let node
        let checkNode
        let childNodes
        let originElement
        if (parent) {
          checkNode = parent._node
          if (checkNode) {
            originElement = Object.getPrototypeOf(this)
            if (originElement._parent) {
              if (parent instanceof originElement._parent._Constructor) {
                key = originElement.key
                childNodes = checkNode.childNodes
                for (var i = 0, l = childNodes.length; i < l; i++) {
                  checkNode = childNodes[i]
                  if (checkNode.nodeType !== 3) {
                    if (this.getNodeKey(checkNode) === key) {
                      node = checkNode
                      break
                    }
                  }
                }
              }
            }
          }
        }
        if (!node) {
          node = this._node.cloneNode(true)
        }
        node.base = this
        this._node = node
      }
      return derivedObservable.apply(this, arguments)
    }
  }
}
