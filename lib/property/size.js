"use strict";

var Property = require('./')

exports.$flags = {
  $width: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var node = element.$node
        var val = this.$val + 'px'

        node.style.width = val
      }
    }
  }),

  $height: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var node = element.$node
        var val = this.$val + 'px'

        node.style.height = val
      }
    }
  })
}