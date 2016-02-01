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
    render () {}, // what does this need to do only subs and stuff handle better... has .render is not good
    Child: {
      render (val, properties, children) {
        var key = this.key
        if (val || val === 0) {
          properties[key] = val
        }
      }
    }
  })
}
