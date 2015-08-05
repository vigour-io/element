"use strict";

var Property = require('../')
var util = require('vjs/lib/util')
var ua = require('../../ua')
var mixins = require( '../../mixins' )
var joinTransforms = require( './mergeTransforms' )

// exports.extended = function(){
//   return module.exports = require('./extended')
// }

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

        node.style.opacity = val
      }
    }
  }),

  // extended
  $z: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var x = element.$x ? element.$x.$val : 0
        var y = element.$y ? element.$y.$val : 0
        var z = this.$val

        element.set({
          $translate3d: mixins.translate3d(x, y, z)
        })
      }
    }
  }),

  $translate: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $translate: val
        })
      }
    }
  }),

  $rotate: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $rotate: val
        })
      }
    }
  }),

  $transformOrigin: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transformOrigin = mixins.transformOrigin(val)
      }
    }
  }),

  $skewX: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var skewX = this.$val
        var skewY = element.$skewY ? element.$skewY.$val : 0

        element.set({
          $skew: mixins.skew(skewX, skewY)
        })
      }
    }
  }),

  $skewY: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var skewX = element.$skewX ? element.$skewX.$val : 0
        var skewY = this.$val

        console.log(skewY)

        element.set({
          $skew: mixins.skew(skewX, skewY)
        })
      }
    }
  }),

  $skew: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $skew: val
        })
      }
    }
  }),

  $scaleX: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var scaleX = this.$val
        var scaleY = element.$scaleY ? element.$scaleY.$val : 0

        element.set({
          $scale: mixins.scale(scaleX, scaleY)
        })
      }
    }
  }),

  $scaleY: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var scaleX = element.$scaleX ? element.$scaleX.$val : 0
        var scaleY = this.$val

        element.set({
          $scale: mixins.scale(scaleX, scaleY)
        })
      }
    }
  }),

  $scale: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $scale: val
        })
      }
    }
  })

}