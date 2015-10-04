'use strict'

var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix

exports.properties = {
  /**
   * This is shortcut for css `transition` property
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   transition: '100ms linear opacity 1000ms'
   * })
   */

  transition: new Property({
    on: {
      data: function (event, data) {
        var element = this.parent
        var node = element.node
        var val = this.val

        node.style[prefix + 'Transition'] = val
      }
    }
  })
}
