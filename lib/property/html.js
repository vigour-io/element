'use strict'
var Property = require('./')
/**
 * Use html to specify a innerHTML of an element
 * @type {string}
 * @memberOf Property
 *  we can use tmeplate language operators for this e.g. markdown
 * @example
 * var a = new Element({
 *   html: {
 *     val: "<p>"
 *   }
 * })
 *
 */
exports.properties = {
  html: new Property({
    on: {
      data: {
        html (data, event) {
          if (this._input === null || data === null) {
            return
          }
          var element = this.parent
          var v = this.val
          if (!v && v !== 0) {
            v = ''
          } else {
            let type = typeof v
            if (type !== 'string' && type !== 'number') {
              v = ''
            }
          }
          if (element) {
            let node = element.node
            node.innerHTML = v
          }
        }
      }
    }
  }).Constructor
}
