"use strict";

var Property = require('./')
var Observable = require('vjs/lib/observable')
// var setKeyInternal = Property.prototype.$setKeyInternal

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
      $ChildConstructor:new Observable({
        $on:{
          $change:function(  ){
            var key = this.$key
            var val = this.$val
            var node = this.$parent.$parent.$node
            if( val ){
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