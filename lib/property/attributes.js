'use strict'
var Property = require('./index')
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
exports.properties = {
  attributes: new Property({
    properties: {
      type: null
    },
    define: {
      compare () {},
      getType (val) { return val }
    },
    render () {},
    Child: {
      render (val, properties, children) {
        var key = this.key
        properties[key] = val
      }
    }
  })
}
