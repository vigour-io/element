"use strict";

var Property = require('./')

exports.$flags = {
  $css: new Property({
    $on: {
      $change: function( event ) {
        this.$parent.$node.className = this.$val
      }
    }
  })
}