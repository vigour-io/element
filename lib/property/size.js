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
      data (data, event) {
        var element = this.parent
        var node = element.node
        var val = this.val
        node.style.width = typeof val === 'string' ? val : val + 'px'
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
      data (data, event) {
        var element = this.parent
        var node = element.node
        var val = this.val
        node.style.height = typeof val === 'string' ? val : val + 'px'
      }
    }
  })
}
