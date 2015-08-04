"use strict";

var Property = require('../')
var util = require('vjs/lib/util')
var ua = require('../../ua')
var mixins = require( '../../mixins' )
var joinTransforms = require( './mergeTransforms' )

exports.extended = function(){
  return module.exports = require('./extended')
}

exports.$flags = {
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var x = this._$val
        var y = element.$y ? element.$y.$val : 0
        var z = element.$z ? element.$z.$val : 0

        element.set({
          $translate3d: mixins.translate3d(x, y, z)
        })
      }
    }
  }),

  $y: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var x = element.$x ? element.$x.$val : 0
        var y = this.$val
        var z = element.$z ? element.$z.$val : 0

        element.set({
          $translate3d: mixins.translate3d(x, y, z)
        })
      }
    }
  }),

  $translate3d: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $translate3d: val
        })
      }
    }
  }),

  $opacity: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var node = element.$node
        var val = this.$val

        node.style.opacity = opacity
      }
    }
  })
}