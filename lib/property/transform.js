"use strict";

var Property = require('./')

exports.$flags = {
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
      	var val = this.$val
        console.error('my $x!!',val)
      	// var element = this.$parent
      	// var node = element.$node
      	// if( val ){
      	// 	node.className = val
      	// 	node.setAttribute('key',element._$key)
      	// } else {
      	// 	node.className = element._$key
      	// 	node.removeAttribute('key')
      	// }
      }
    }
  }),
  $y: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        console.error('my $y!!',val)
        // var element = this.$parent
        // var node = element.$node
        // if( val ){
        //  node.className = val
        //  node.setAttribute('key',element._$key)
        // } else {
        //  node.className = element._$key
        //  node.removeAttribute('key')
        // }
      }
    }
  })
}