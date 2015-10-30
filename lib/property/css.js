'use strict'
var Property = require('./')

exports.properties = {
  /**
   * Use css to set a css class for the element
   * @type {string}
   * @todo use this for the className in dom elements
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   css: "confirmButton"
   * })
   */
  css: new Property({
    on: {
      data: function (data, event) {
        var element = this.parent
        if (element) {
          let val = this.val
          let node = element.node
          let key = element.key
          if (val) {
            if (key) {
              node.className = key + ' ' + val
            } else {
              node.className = val
            }
            node.setAttribute('data-key', key || 0)
          } else {
            node.className = key
            node.removeAttribute('data-key')
          }
        }
      }
    }
  })
}
