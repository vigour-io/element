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
            node.setAttribute('data-key', key)
          } else {
            node.removeAttribute('data-key')
            node.className = key
          }
        }
      }
    },
    properties: {
      /**
       * Method to add class on element
       * @type {string}
       * @memberOf Property.css
       * @todo make sure it can add multiple classes
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
            if (data === null) return
            var val = this.val
            var css = this.parent
            var cssVal = css.val
            var node = css.parent.node

            if (typeof cssVal !== 'string') {
              cssVal = css.val = node.className
            }

            var cssArr = cssVal.split(' ')
            var valArr = val.split(' ')
            var i = valArr.length - 1

            for (; i >= 0; i--) {
              let val = valArr[i]
              let index = cssArr.indexOf(valArr[i])

              if (index === -1) {
                cssArr.push(val)
              }
            }

            css.set(cssArr.join(' '), event)
            this.set('', event)
          }
        }
      }),

      /**
       * Method to remove class from class list
       * @type {string}
       * @memberOf Property.css
       * @todo make sure it can remove multiple classes
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
            if (data === null) return
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

            for (; i >= 0; i--) {
              let index = cssArr.indexOf(valArr[i])

              if (~index) {
                cssArr.splice(index, 1)
              }
            }

            css.set(cssArr.join(' '), event)
            this.set('', event)
          }
        }
      }),
      /**
       * Method to toggle any class
       * @type {string}
       * @memberOf Property.css
       * @todo make sure it can toggle multiple classes
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
            if (data === null) return
            var val = this.val
            var css = this.parent
            var cssVal = css.val

            if (typeof cssVal !== 'string') {
              cssVal = css.val = css.parent.node.className || ''
            }

            var cssArr = cssVal.split(' ')
            var valArr = val.split(' ')
            var i = valArr.length - 1

            for (; i >= 0; i--) {
              let val = valArr[i]
              let index = cssArr.indexOf(val)

              if (~index) {
                cssArr.splice(index, 1)
              } else {
                cssArr.push(val)
              }
            }

            css.set(cssArr.join(' '), event)
            this.set('', event)
          }
        }
      })
    }
  })
}
