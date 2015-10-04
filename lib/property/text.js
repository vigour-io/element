'use strict'

var Property = require('./')

exports.properties = {
  /**
   * Use text to specify a text to an element
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   text: {
   *     val: "some text"
   *   }
   * })
   *
   */
  text: new Property({
    on: {
      data: {
        text: function (data, event) {
          var element = this.parent
          var v = this.val
          if (!v && v !== 0) {
            v = ''
          }
          if (element) {
            var node = element.node
            var nodes = node.childNodes

            if (/text/.test(node.type)) {
              node.value = v
              return
            }

            if (nodes) {
              for (var i = 0, l = nodes.length; i < l; i++) {
                node = nodes[i]
                if (node.nodeType === 3) {
                  node.nodeValue = v
                  return
                }
              }
            }

            node.appendChild(document.createTextNode(v))
          }
        }
      }
    }
  }).Constructor
}
