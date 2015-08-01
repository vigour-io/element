"use strict";

var Property = require('./')

exports.$flags = {
  $backgroundcolor: new Property({
    $on: {
      $change: function( event ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node
        if( val ){
          node.style.backgroundColor = val
        } 
      }
    }
  })
}