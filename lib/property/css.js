'use strict'

// var _ = require('vjs/node_modules/lodash')
var Property = require('./')

exports.properties = {
  /**
   * Use css to set a css class for the element
   * @type {string}
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
          var val = this.val
          var node = element.node
          var key = element.key || 0
          if (val) {
            node.className = val
            node.setAttribute('data-key', key)
          } else {
            node.className = key
            node.removeAttribute('data-key')
          }
        }
      }
    },
    properties: {
      /**
       * Method to add class on element
       * @type {string}
       * @memberOf Property.css
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   on: {
       *     data: function () {
       *       this.set({
       *         css: {
       *           addClass: 'move toRight'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      addClass: new Property({
        on: {
          data: function (data, event) {
            var val = this.val
            var css = this.parent
            var cssVal = css.val
            var node = css.parent.node

            if (typeof cssVal !== 'string') {
              cssVal = css.val = node.className || ''
            }

            var cssArr = cssVal.split(' ')
            var valArr = val.split(' ')
            var i = valArr.length - 1
            var index

            for (; i >= 0; i--) {
              val = valArr[i]
              index = cssArr.indexOf(valArr[i])

              if (index === -1) {
                cssArr.push(val)
              }
            }

            css.val = cssArr.join(' ')

            this.set('', event)
          }
        }
      }),

      /**
       * Method to remove class from class list
       * @type {string}
       * @memberOf Property.css
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   on: {
       *     data: function () {
       *       this.set({
       *         css: {
       *           removeClass: 'toRight',
       *           addClass: 'toLeft'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      removeClass: new Property({
        on: {
          data: function (data, event) {
            var val = this.val
            var css = this.parent
            var cssVal = css.val
            var node = css.parent.node

            if (typeof cssVal !== 'string') {
              cssVal = css.val = node.className || ''
            }

            var cssArr = cssVal.split(' ')
            var valArr = val.split(' ')
            var i = valArr.length - 1
            var index

            for (; i >= 0; i--) {
              index = cssArr.indexOf(valArr[i])

              if (~index) {
                cssArr.splice(index, 1)
              }
            }

            css.val = cssArr.join(' ')

            this.set('', event)
          }
        }
      }),

      /**
       * Method to toggle any class
       * @type {string}
       * @memberOf Property.css
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   on: {
       *     data: function () {
       *       this.set({
       *         css: {
       *           toggleClass: 'active blue'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      toggleClass: new Property({
        on: {
          data: function (data, event) {
            var val = this.val
            var css = this.parent
            var cssVal = css.val

            if (typeof cssVal !== 'string') {
              cssVal = css.val = css.parent.node.className || ''
            }

            var cssArr = cssVal.split(' ')
            var valArr = val.split(' ')
            var i = valArr.length - 1
            var index

            for (; i >= 0; i--) {
              val = valArr[i]
              index = cssArr.indexOf(val)

              if (~index) {
                cssArr.splice(index, 1)
              } else {
                cssArr.push(val)
              }
            }

            css.val = cssArr.join(' ')

            this.set('', event)
          }
        }
      })
    }
  })
}
