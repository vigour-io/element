'use strict'
var Property = require('./')

exports.properties = {
  href: new Property({
    ChildConstructor: Property,
    render (node, event, element) {
      node.setAttribute('href', this.parseValue())
    }
  })
}
