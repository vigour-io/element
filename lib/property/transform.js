"use strict";

var Property = require('./')
var util = require('vjs/lib/util')
var ua = require('../ua')
var mixin = require( '../mixins/transforms' )


function prettifyTransform (property, value) {
  return property.substr(1) + '(' + value + ')'
}

function joinTransforms (properties) {
  // available transforms
  var transforms = [
    '$rotate',
    '$translate',
    '$translate3d',
    '$skew',
    '$scale',
    '$matrix'
  ]

  for (var i = 0, length = transforms.length, parent = this.$parent; i < length; i++) {

    var property = transforms[i]
    var parentProperty = parent[property]

    // first check if it match with passed properties
    if (properties[property]) {
      transforms[i] = prettifyTransform(property, properties[property])
    }
    // then check if the property is already defined in element
    else if (parentProperty){
      transforms[i] = prettifyTransform(property, parentProperty.$val)
    }
    // delete
    else {
      transforms[i] = void 0
    }
  }

  console.log(transforms)
  console.info('applying transform:', transforms.join(' '))

  return transforms.join(' ')
}

exports.$flags = {
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

      	var x = this.$val
        var y = element.$y ? element.$y.$val : 0
        var z = element.$z ? element.$z.$val : 0

        element.$translate3d.$val = mixin.translate3d(x, y, z)
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

        element.$translate3d.$val = mixin.translate3d(x, y, z)
      }
    }
  }),

  $z: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var x = element.$x ? element.$x.$val : 0
        var y = element.$y ? element.$y.$val : 0
        var z = this.$val

        element.$translate3d.$val = mixin.translate3d(x, y, z)
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

  $rotate: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = util.isLikeNumber(this.$val) ? this.$val : 0
        var element = this.$parent
        var node = element.$node

        node.style.transform = joinTransforms.call(this, {
          $rotate: val
        })
      }
    }
  }),

  $skewX: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var skewY = element.$skewY ? element.$skewY.$val : 0

        element.$skew.$val = mixin.skew(val, skewY)
      }
    }
  }),

  $skewY: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var skewX = element.$skewX ? element.$skewX.$val : 0

        element.$skew.$val = mixin.skew(skewX, val)
      }
    }
  }),

  $skew: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        console.error(val)

        node.style.transform = joinTransforms.call(this, {
          $skew: val
        })
      }
    }
  }),

  $scaleX: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var scaleY = element.$scaleY

        element.$scale.$val = val / 100 + ', ' + (scaleY ? scaleY.$val : 0) / 100
      }
    }
  }),

  $scaleY: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var scaleX = element.$scaleX

        element.$scale.$val = (scaleX ? scaleX.$val : 0) / 100 + ', ' +  val / 100
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
  }),

  $transformOrigin: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        node.style.transformOrigin = val
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

        node.style.opacity = opacity
      }
    }
  })
}