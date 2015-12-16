'use strict'
var Cache = require('vigour-js/lib/operator/cache/constructor')
module.exports = function (element) {
  var Element = element.Constructor
  element.set({
    on: {
      parent: {
        element (data, event) {
          if ((this instanceof Element) || this === element) {
            let child = this
            let parent = this.parent
            if (parent instanceof Cache) {
              let ref = this._input
              if (ref instanceof Element) {
                child = this._input
              }
              if (ref._input === null) {
                return
              }
              parent = parent.parent
              if ((parent instanceof Element) || parent === element) {
                let insertBefore = this.insertBefore
                if (insertBefore) {
                  let refNode = parent[insertBefore].node
                  if (refNode) {
                    parent.node.insertBefore(child.node, refNode)
                    return
                  }
                  console.warn('can\'t find insertBefore node')
                }
                parent.node.appendChild(child.node)
              }
            }
          }
        }
      }
    }
  })
}
