"use strict";

var Property = require('./')
var ua = require('../ua')

exports.$flags = {
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
      	var val = this.$val
        var element = this.$parent
        var node = element.$node
        var y = element.$y

        node.style.transform = 'translate(' + val + 'px, ' + (y ? y.$val : 0) + 'px)';
      }
    }
  }),

  $y: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node
        var x = element.$x

        node.style.transform = 'translate(' + (x ? x.$val : 0) + 'px, '+  val +  'px)';
      }
    }
  }),

  $opacity: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var node = element.$node

        var val = this.$val
        val = parseInt(val * 100) / 100

        node.style.opacity = val
      }
    }
  })
}