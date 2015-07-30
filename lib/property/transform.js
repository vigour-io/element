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

        console.time('translate3d - x')
        node.style.transform = 'translate3d(' + val + 'px, ' + (y ? y.$val : 0) + 'px,0)';
        console.timeEnd('translate3d - x')
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

        console.time('translate3d - y')
        node.style.transform = 'translate3d(' + (x ? x.$val : 0) + 'px, '+  val +  'px,0)';
        console.timeEnd('translate3d - y')
      }
    }
  }),

  $opacity: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var node = element.$node
        var val = this.$val
        var opacity = parseInt(val * 100) / 100

        console.time('opacity')
        node.style.opacity = opacity
        console.timeEnd('opacity')
      }
    }
  })
}