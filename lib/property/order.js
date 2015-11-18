'use strict'

var Property = require('./')

exports.properties = {
  /**
   * Orders specifies css `order` property
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   order: 1
   * })
   *
   * var a = new Element({
   *   order: 2
   * })
   *
   */

  order: new Property({
    on: {
      data: function (data, event) {
        var element = this.parent
        var node = element.node
        var val = this.val

        node.style.order = val
      }
    }
  }).Constructor
}
