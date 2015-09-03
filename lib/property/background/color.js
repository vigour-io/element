"use strict";
var Property = require('../')

exports.$flags = {
  /**
   * Use $color to set the element backgroundColor
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $background: { $color: "#bada55" }
   * })
   */
  $color: new Property({
    $on: {
      $change: {
        dom: function( event, removed ) {
          var val = this.$val
          var node = this.lookUp( '$node' )
          node.style.backgroundColor = !removed && val ? val : null
        }
      }
    }
  })
}
