"use strict";
var Property = require('../')

exports.$flags = {
  /**
   * Use $image to set the element backgroundImage
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $background: { $image: "imagePath/dog.png" }
   * })
   *
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
