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
       *  $on: {
       *    $up: function () {
       *      this.$css.addClass('done')
       *    }
       *  }
       *})
       */
<<<<<<< HEAD
      $addClass: new Property({
        $on: {
          $change: function(event, removed) {
            var arr = this.$val.split(' ')
            var index = arr.indexOf(className)
=======
      addClass: function (className) {
        var arr = this.$val.split(' ')
        var index = arr.indexOf(className)
>>>>>>> 95de196507899640ddc1cabce189d9b398d0034d

            if (index < 0) {
              this.$val += ' ' + className
            }
          }
        }
      }),

      /**
       * Method to remove class from class list
       * @function removeClass
       * @memberOf Property
       * @todo make sure it can remove multiple classes
       * @todo check performance
       *
       * @example
       *
       * var elem = new Element({
       *  $on: {
       *    $change: function () {
       *      this.$css.removeClass('empty')
       *    }
       *  }
       *})
       */
<<<<<<< HEAD
      $removeClass: new Property({
        $on: {
          $change: function(event, removed) {
            var arr = this.$val.split(' ')
            var index = arr.indexOf(className)
=======
      removeClass: function (className) {
        var arr = this.$val.split(' ')
        var index = arr.indexOf(className)
>>>>>>> 95de196507899640ddc1cabce189d9b398d0034d

            if (index > -1) {
              arr.splice(index, 1)
            }

            this.$val = arr.join(' ')
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
       *  $on: {
       *    $click: function () {
       *      this.$css.toggleClass('active')
       *    }
       *  }
       *})
       */
<<<<<<< HEAD
      toggleClass: new Property({
        $on: {
          $change: function(event, removed) {
            var arr = this.$val.split(' ')
            var index = arr.indexOf(className)
=======
      toggleClass: function (className) {
        var arr = this.$val.split(' ')
        var index = arr.indexOf(className)
>>>>>>> 95de196507899640ddc1cabce189d9b398d0034d

            if (index > -1) {
              arr.splice(index, 1)
              this.$val = arr.join(' ')
            }
            else {
              this.$val += ' ' + className
              console.log('toggle: added')
            }
          }
        }
      }),
    }
  })
}