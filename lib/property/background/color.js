'use strict'
var Property = require('../')

exports.properties = {
  /**
   * Use color to set the element backgroundColor
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   background: { color: "#bada55" }
   * })
   */
  color: new Property({
    render (node, event) {
      node.style.backgroundColor = this.parseValue() || null
    }
  })
}
