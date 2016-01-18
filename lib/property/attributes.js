'use strict'
var Property = require('./')

exports.properties = {
  /**
   * Use attributes to set any attributes on the Element
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   attributes: {
   *     draggable: false,
   *     data: "any value"
   *   }
   * })
   */
  attributes: new Property({
    render (node, event, element) {
      this.each(function (property) {
        property.render(node, event, element)
      })
    },
    define: {
      ChildConstructor: new Property({
        render (node, event) {
          var key = this.key
          var val = this.parseValue()
          if (val || val === 0) {
            node.setAttribute(key, val)
          } else {
            node.removeAttribute(key)
          }
        }
      }).Constructor
    }
  })
}
