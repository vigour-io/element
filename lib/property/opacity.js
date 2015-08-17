"use strict";

var Property = require('./')

exports.$flags = {
  /**
   * This is the shortcut for css `opacity` property
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $opacity: 0.5
   * })
   *
   */

  $opacity: new Property({
    $on: {
      $change: function( event, removed ) {
        var $element = this.$parent
        var $node = $element.$node
        var $val = this.$val

        $node.style.opacity = $val
      }
    }
  })
}