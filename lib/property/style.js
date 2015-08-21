"use strict";

var Property = require('./')
var Observable = require('vjs/lib/observable')
// var setKeyInternal = Property.prototype.$setKeyInternal

exports.$flags = {
  /**
   * $style applyes inline css proeprties on element
   * @type {object}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $style: {
   *     overflow: 'hidden',
   *     display: 'block'
   *   }
   * })
   */
  $style: new Property({
    $define:{
      $ChildConstructor:new Property({
        $on:{
          $change:function( event, removed ){
            var $key = this.$key
            var $val = this.$val
            var $node = this.$parent.$parent.$node

            $node.style[$key] = $val
          }
        }
      }).$Constructor
    }
  })
}
