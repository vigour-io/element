'use strict'

var React = require('react')

module.exports = function (element) {
  var Element = element.Constructor
  element.set({
    on: {
      parent: {
        element: function (data, event) {
          if ((this instanceof Element) || this === element) {
            // console.log(this.parent.node)
            if(!this.parent.node.props.children) {
                this.parent.node.props.children = []
            }
            this.parent.node.props.children.push(this.node)
            // this.parent.node.appendChild(this.node)
          }
        }
      }
    }
  })
}
