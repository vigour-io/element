'use strict'
var Cache = require('vjs/lib/operator/cache/constructor')

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

            console.info('parent?',parent,parent instanceof Cache)

            if (parent instanceof Cache) {
              if (this._input instanceof Element) {
                child = this._input
              }
              parent = parent.parent
              // child.resolveContext({})
              // fireParent = true
            }

            console.log('appending...',child.node.innerHTML)

            parent.node.appendChild(child.node)

            // console.log(child._on.parentEmitter)
            // if (fireParent) {
            //   child.emit('parent', parent, event)
            // }
          }
        }
      }
    }
  })
}
