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
    }
  })
}