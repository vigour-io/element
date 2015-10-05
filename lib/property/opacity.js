'use strict'

var Property = require('./')

exports.properties = {
  /**
   * This is the shortcut for css `opacity` property
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   opacity: 0.5
   * })
   *
   */
  opacity: new Property({
    on: {
      data: function (event, data) {
        var element = this.parent
        var node = element.node
        var val = this.val

        node.style.opacity = val
      }
    }
  })
}
