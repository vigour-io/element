'use strict'

var Property = require('./')

exports.properties = {
  /**
   * Use width to set the width of a specific element
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   width: 100
   * })
   *
   */

  width: new Property({
    on: {
      data: function (data, event) {
        var element = this.parent
        var node = element.node
        var val = this.val + 'px'

        node.style.width = val
      }
    }
  }).Constructor,

  /**
   * Use height to set the height of a specific element
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   height: 100
   * })
   *
   */

  height: new Property({
    on: {
      data: function (data, event) {
        var element = this.parent
        var node = element.node
        var val = this.val + 'px'

        node.style.height = val
      }
    }
  })
}
