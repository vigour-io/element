'use strict'
var Property = require('./')
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
exports.properties = {
  text: new Property({
    on: {
      data: {
        text: function (data, event) {

          console.log('TEXT--->',this.val, this.parent.path)

          // this is super heavy
          var element = this.parent
          // this is whats heavy getting the val
          var v = this.val

          if (!v && v !== 0) {
            v = ''
          } else {
            var type = typeof v
            // TODO should this guard be here?
            if (type !== 'string' && type !== 'number') {
              console.warn('trying to set text, with non-string/non-number', v, v.val)
              return
            }
          }

          if (element) {
            var node = element.node
            var nodes = node.childNodes

            node.style.border = '5px solid blue'

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
