"use strict";

var Property = require('./')



var Emitter = require( 'vjs/lib/emitter' )
var emit = Emitter.prototype.$emit

exports.$flags = {
  /**
   * Use $backgroundImage to set the element backgroundImage 
   * @function $backgroundImage
   * @memberOf Property
   * 
   * @example
   * var a = new Element({
   *   $backgroundImage : "imagePath/dog.png"
   * })
   * 
   */
  $backgroundImage: new Property({
    $on: {
      $change: function( event, remove ) {
        if(remove){

        }else{
          var val = this.$val
          var size = this.$size
          var element = this.$parent
          var node = element.$node
          var img = document.createElement('img')
          var _this = this

          //TODO: create or share event on emit
          img.onerror = function() {
            _this.$emit("$error", void 0)
            img.onlerror = null
          }

          img.onload = function() {
            _this.$emit("$load", void 0)
            img.onload = null
            img = void 0
          }

          if( val ){
            img.src = val
            node.style.backgroundImage = 'url('+val+')'
          }

          if( size ){
            node.style.backgroundSize = size
          }
        }
      }
    }
  })
}