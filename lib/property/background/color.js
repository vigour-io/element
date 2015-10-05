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
    on: {
      data: {
        dom: function (data, event) {
          var val = this.val
          var node = this.lookUp('node')
          node.style.backgroundColor = data !== null && val ? val : null
        }
      }
    }
  })
}
