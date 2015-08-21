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
      $ChildConstructor:new Property({
        $on:{
          $change:function( event, removed ){
            var key = this.$key
            var val = this.$val
            console.log('%c WWWWW', 'color:blue;padding:10px;', val, event, this.$path, removed)

            var node = this.$parent.$parent.$node
            if( !removed && val || val === 0 ){
              console.log('ok set it')
              node.setAttribute( key, val)
            }else{
              console.log('remove it?', key)
              node.removeAttribute( key )
            }
          }
        }
      }).$Constructor
    }
  })
}
