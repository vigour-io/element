'use strict'

var Property = require('./')

exports.properties = {
  /**
   * style applies inline css properties on element
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   style: {
   *     overflow: 'hidden',
   *     display: 'block'
   *   }
   * })
   */
  style: new Property({
    define: {
      ChildConstructor: new Property({
        on: {
          data: function (data, event) {
            var key = this.key
            var val = this.val
            var node = this.parent.parent.node

            node.style[key] = val
          }
        }
      }).Constructor
    }
  })
}
