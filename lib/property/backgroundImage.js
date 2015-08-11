"use strict";

var Property = require('./')

var Emitter = require( 'vjs/lib/emitter' )
var emit = Emitter.prototype.$emit

exports.$flags = {
  /**
   * Use $backgroundImage to set the element backgroundImage
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $backgroundImage: "imagePath/dog.png"
   * })
   *
   */

  $backgroundImage: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var node = this.$parent.$node
        var _this
        var img

        if( !removed && val ){
          img = document.createElement('img')
          _this = this
          img.onerror = function() {
            _this.$emit("$error", void 0)
            img.onerror = null
          }

          img.onload = function() {
            _this.$emit("$load", void 0)
            img.onload = null
            img = void 0
          }

          img.src = val
          node.style.backgroundImage = 'url('+val+')'
        }else{
          node.style.backgroundImage = null
        } 
      }
    }
  })
}