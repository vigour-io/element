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

var flatparse = require('vigour-js/lib/base').prototype.parseValue
exports.properties = {
  text: new Property({
    define: {
      generateConstructor () {
        return function DerivedProperty (val, ev, parent, key) {
          if (parent) {
            let node = parent.node
            let childNodes = node.childNodes
            for (let i = 0, l = childNodes.length; i < l; i++) {
              if (childNodes[i].nodeType === 3) {
                node = false
                break
              }
            }
            if (node) {
              node.appendChild(document.createTextNode(''))
            }
          }
          return Property.apply(this, arguments)
        }
      }
    },
    on: {
      data: {
        text (data, event) {
          // if ! this._input use data ! thats fucking noice
          // if (data !== null && this._input !== null) {
            let element = this._parent
            if (element) {
//               // let val = this.val
//           if (data !== null) {
//             let element = this.parent
//             if (element) {
//               let val = this.parseValue(void 0, event)
//               let type = typeof val
              let node = element.node //bitch call my context
              node.childNodes[0].nodeValue = flatparse.call(this) // this.parseValue()
                // if (childNodes) {
                //   for (let i = 0, l = childNodes.length; i < l; i++) {
                //     let childNode = childNodes[i]
                //     if (childNode.nodeType === 3) {
                //       childNode.nodeValue = val
                //       return
                //     }
                //   }
                // }
              // let type = typeof val
              // let node = element.node
              // if (type !== 'string' && type !== 'number') {
              //   val = ''
              // }
              // if (/text/.test(node.type)) {
              //   if (node.value !== val) {
              //     node.value = val
              //   }
              //   return
              // }
              // let childNodes = node.childNodes
              // if (childNodes) {
              //   for (let i = 0, l = childNodes.length; i < l; i++) {
              //     let childNode = childNodes[i]
              //     if (childNode.nodeType === 3) {
              //       childNode.nodeValue = val
              //       return
              //     }
              //   }
              // }
            // }
          }
        }
      }
    }
  }).Constructor
}
