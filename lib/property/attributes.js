"use strict";

var Property = require('./')
var Observable = require('vjs/lib/observable')

exports.$flags = {
  /**
   * Use $attributes to set any attributes on the Element
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $attributes: {
   *     draggable: false,
   *     data: "any value"
   *   }
   * })
   */
  $attributes: new Property({
    $define:{
      $ChildConstructor:new Property({
        $on:{
          $change:function( event, removed ){
            var key = this.$key
            var val = this.$val

            var node = this.$parent.$parent.$node
            if( val || val === 0 ){
              node.setAttribute( key, val)
            }else{
              node.removeAttribute( key )
            }
          }
        }
      }).$Constructor
    }
  })
}
