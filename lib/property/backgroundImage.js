"use strict";

var Property = require('./')



var Emitter = require( 'vjs/lib/emitter' )
var emit = Emitter.prototype.$emit
//need it ? ^^^

exports.$flags = {
  $backgroundImage: new Property({
    $on: {
      $change: function( event ) {
        var val = this.$val
        var size = this.$size
        var element = this.$parent
        var node = element.$node
        var img = document.createElement('img')

        img.onerror = function() {
          this.$emit("$error")
        }.bind(this)

        img.onload = function() {
          this.$emit("$load")
        }.bind(this)

        
        if( val ){
          img.src = val
          node.style.backgroundImage = 'url('+this.$val+')'
        } 
        if( size ){
          node.style.backgroundSize = size
        }

      }
    }
  })
}