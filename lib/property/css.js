"use strict";

var _ = require('vjs/node_modules/lodash')
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
      $new:function(){
        console.log('>>>>',this.$val)
      },
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
       * @type {string}
       * @memberOf Property.$css
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
       *           $addClass: 'move toRight'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $addClass: new Property({
        $on: {
          $change: function(event, removed) {
            var $val = this.$val
            var $css = this.$parent
            var $cssVal = $css.$val
            var $node = $css.$parent.$node

            if( typeof $cssVal !== 'string' ) {
              $cssVal = $css.$val = $node.className || ''
            }

            var valArr = $val.split(' ')
            var length = valArr.length
            var index

            // check if more then 1 class is given
            if (length > 1) {
              for (var i = 0; i < length; i = i + 1) {
                index = $cssVal.indexOf(valArr[i])

                if (index === -1) {
                  $cssVal = $cssVal + ' ' + valArr[i]
                }
              }

              $css.$val = $cssVal
            }
            else {
              index = $cssVal.indexOf($val)
              if (index === -1) {
                $css.$val = $cssVal + ' ' + $val
              }
            }

            this.set('', event)
          }
        }
      }),

      /**
       * Method to remove class from class list
       * @type {string}
       * @memberOf Property.$css
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
       *           $removeClass: 'toRight',
       *           $addClass: 'toLeft'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $removeClass: new Property({
        $on: {
          $change: function(event, removed) {
            var $val = this.$val
            var $css = this.$parent
            var $cssVal = $css.$val
            var $node = $css.$parent.$node

            if(typeof $cssVal !== 'string') {
              $cssVal = $css.$val = $node.className || ''
            }

            var cssArr = $cssVal.split(' ')
            var valArr = $val.split(' ')
            var length = valArr.length
            var index

            if (length > 1) {
              for (var i = 0; i < length; i = i + 1) {
                index = $cssVal.indexOf(valArr[i])

                if (index !== -1) {
                  cssArr = _.slice(cssArr, index, 1)
                }
              }

              $css.$val = cssArr.join(' ')
            }
            else {
              index = $cssVal.indexOf($val)

              if (index !== -1) {
                $css.$val = $cssVal.replace($val, '');
              }
            }

            this.set('', event)
          }
        }
      }),


      /**
       * Method to toggle any class
       * @type {string}
       * @memberOf Property.$css
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
       *           $toggleClass: 'active'
       *         }
       *       })
       *     }
       *   }
       * })
       */
      $toggleClass: new Property({
        $on: {
          $change: function(event, removed) {
            var $val = this.$val
            var $css = this.$parent
            var $node = parent.$parent.$node
            var str = $node.className
            // var arr = $node.className.split(' ')
            var index = str.indexOf(val)

            if (index > -1) {
              arr = _.slice(arr, index, 1)
              $css.$val = arr.join(' ')
            }
            else {
              arr.push($val)
              $css.$val = arr.join(' ')
            }

            this.$val = ''
          }
        }
      })
    }
  })
}