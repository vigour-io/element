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
        var element = this.$parent
        var node = element.$node
        var img = document.createElement('img')

        img.onerror = function() {
          console.log("not loaded")
          this.$emit("$error")
        }.bind(this)

        img.onload = function() {
          console.log("loaddddd")
          this.$emit("$load")
        }.bind(this)

        if( val ){
          img.src = val
          node.style.backgroundImage = img
        } 
      }
    }
  })
}