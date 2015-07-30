"use strict";

var Property = require('./')

exports.$flags = {
  $css: new Property({
    $on: {
      $change: function( event, removed ) {
      	var val = this.$val
      	var element = this.$parent
      	var node = element.$node
        console.error( event )
      	if( val ){
      		node.className = val
      		node.setAttribute('key',element._$key)
      	} else {
      		node.className = element._$key
      		node.removeAttribute('key')
      	}
      }
    }
  })
}