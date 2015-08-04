"use strict";

var Property = require('./')

exports.$flags = {
  $css: new Property({
    $on: {
      $change: function( event, removed ) {
      	var val = this.$val
      	var element = this.$parent
      	var node = element.$node
        var key = element._$key || 0
      	if( val ){
      		node.className = val
          node.setAttribute('data-key',key)
      	} else {
      		node.className = key
      		node.removeAttribute('data-key')
      	}
      }
    }
  })
}
