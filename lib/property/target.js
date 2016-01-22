'use strict'
var Property = require('./')

exports.properties = {
  target: new Property({
    ChildConstructor: Property,
    render (node, event, element) {
      node.setAttribute('target', this.parseValue())
    }
  })
}
