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
        text (data, event) {
          // TDOD do we need this fix?
          if (this._input === null || data === null) {
            return
          }
          // this is super heavy
          var element = this.parent
          // this is whats heavy getting the val
          var v = this.val
          if (!v && v !== 0) {
            v = ''
          } else {
            let type = typeof v
            // TODO should this guard be here?
            if (type !== 'string' && type !== 'number') {
              console.warn('trying to set text, with non-string/non-number', v, v.val)
              v = ''
            }
          }

          if (element) {
            let node = element.node
            if (/text/.test(node.type)) {
              if (node.value !== v) {
                node.value = v
              }
              return
            }

            let childNodes = node.childNodes
            if (childNodes) {
              for (let i = 0, l = childNodes.length; i < l; i++) {
                let childNode = childNodes[i]
                if (childNode.nodeType === 3) {
                  childNode.nodeValue = v
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
