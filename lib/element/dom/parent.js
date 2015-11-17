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
            // let fireParent

            if (parent instanceof Cache) {
              if (this._input instanceof Element) {
                child = this._input
              }
              parent = parent.parent
              // fireParent = true
            }
            parent.node.appendChild(child.node)

            // if (fireParent) {
            //   child.emit('parent', parent, event)
            // }
          }
        }
      }
    }
  })
}
