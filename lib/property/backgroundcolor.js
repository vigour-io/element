"use strict";

var Property = require( './' )

exports.$flags = {
  /**
   * Use $backgroundColor to set the element backgroundColor
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $backgroundColor : "red"
   * })
   *
   */
  $backgroundColor: new Property({
    $on: {
      $change: function( event ) {
        var $val = this.$val
        var $element = this.$parent
        var $node = $element.$node

        $node.style.backgroundColor = $val
      }
    }
  })
}
