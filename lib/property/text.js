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
    define: {
      generateConstructor () {
        return function DerivedProperty (val, ev, parent, key) {
          if (parent) {
            parent.node.appendChild(document.createTextNode(''))
          }
          return Property.apply(this, arguments)
        }
      }
    },
    on: {
      data: {
        text (data, event) {
          if (data !== null && this._input !== null) {
            let element = this.parent
            if (element) {
              let val = this.val
              let type = typeof val
              let node = element.node
              if (type !== 'string' && type !== 'number') {
                val = ''
              }
              if (/text/.test(node.type)) {
                if (node.value !== val) {
                  node.value = val
                }
                return
              }
              let childNodes = node.childNodes
              if (childNodes) {
                for (let i = 0, l = childNodes.length; i < l; i++) {
                  let childNode = childNodes[i]
                  if (childNode.nodeType === 3) {
                    childNode.nodeValue = val
                    return
                  }
                }
              }
            }
          }
        }
      }
    }
  }).Constructor
}
