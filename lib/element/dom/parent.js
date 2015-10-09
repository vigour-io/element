'use strict'

module.exports = function (element) {
  var Element = element.Constructor
  element.set({
    on: {
      parent: {
        element: function (data, event) {
          if ((this instanceof Element) || this === element) {
            this.parent.node.appendChild(this.node)
          }
        }
      }
    }
  })
}
