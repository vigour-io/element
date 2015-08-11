"use strict";

var Property = require('./')

exports.$flags = {
  /**
   * Use $css to set a css class for the element
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $css: "confirmButton"
   * })
   */

  $css: new Property({
    $on: {
      $change: function( event, removed ) {
      	var element = this.$parent
        if( element ){
          var val = this.$val
        	var node = element.$node
          var key = element.$key || 0
        	if( val ){
        		node.className = val
            node.setAttribute('data-key',key)
        	} else {
        		node.className = key
        		node.removeAttribute('data-key')
        	}
        }
      }
    },
    $flags: {
      /**
       * Method to add class on element
       * @function addClass
       * @memberOf Property
       * @todo make sure it can add multiple classes
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   $on: {
       *     $change: function () {
       *       this.set({
       *         $css: {
       *           addClass: 'empty'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $addClass: new Property({
        $on: {
          $change: function(event, removed) {
            var val = this.$val
            var parent = this.$parent
            var arr = parent.$val.split(' ')
            var index = arr.indexOf(val)

            if (index < 0) {
              parent.$val += ' ' + val
            }

            this.$val = ''
          }
        }
      }),

      /**
       * Method to remove class from class list
       * type string
       * @memberOf Property
       * @todo make sure it can remove multiple classes
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   $on: {
       *     $change: function () {
       *       this.set({
       *         $css: {
       *           removeClass: 'empty'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $removeClass: new Property({
        $on: {
          $change: function(event, removed) {
            var val = this.$val
            var parent = this.$parent
            var arr = parent.$val.split(' ')
            var index = arr.indexOf(val)

            if (index > -1) {
              arr.splice(index, 1)
            }

            parent.$val = arr.join(' ')
            this.$val = ''
          }
        }
      }),


      /**
       * Method to toggle any class
       * @function toggleClass
       * @memberOf Property
       * @todo make sure it can toggle multiple classes
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *   $on: {
       *     $change: function () {
       *       this.set({
       *         $css: {
       *           removeClass: 'active'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $toggleClass: new Property({
        $on: {
          $change: function(event, removed) {
            var val = this.$val
            var arr = this.$parent.$val.split(' ')
            var index = arr.indexOf(val)

            if (index > -1) {
              arr.splice(index, 1)
              this.$parent.$val = arr.join(' ')
            }
            else {
              this.$parent.$val += ' ' + val
            }

            this.$val = ''
          }
        }
      })
    }
  })
}