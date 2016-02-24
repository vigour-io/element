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
      getType (val) {
        return val
      }
    },
    render () {},
    Child: {
      render (val, properties, children) {
        if (val.properties) {
          console.warn('something is wrong in attributes!')
          return
        }
        properties[this.key] = val
      }
    }
  })
}
