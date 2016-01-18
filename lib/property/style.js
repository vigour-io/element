'use strict'
var Property = require('./')

exports.properties = {
  /**
   * Use style to set any style on the Element
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   style: {
   *     border: "1px solid blue",
   *     margin: "20px"
   *   }
   * })
   */
  style: new Property({
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
            node.style[key] = val
          } else {
            node.style[key] = null
          }
        }
      }).Constructor
    }
  })
}
