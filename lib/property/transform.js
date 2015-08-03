"use strict";

var Property = require('./')
var util = require('vjs/lib/util')
var ua = require('../ua')


function prettifyTransform (property, value) {
  return property.substr(1) + '(' + value + ')'
}

function joinTransforms (properties) {
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
    if (properties[property]) {
      transforms[i] = prettifyTransform(property, properties[property])
    } else if (parent[property]){
      transforms[i] = prettifyTransform(property, parent[property].$val)
    } else {
      transforms[i] = void 0
    }
  }

  // console.log(transforms)
  console.info('applying transform:', transforms.join(''))

  return transforms.join(' ')
}

exports.$flags = {
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
      	var val = this.$val
        var element = this.$parent
        var y = element.$y
        var z = element.$z

        if(!util.isNumber(val)) {
          val = 0
        }

        element.$translate3d.$val = val + 'px, ' + (y ? y.$val : 0) + 'px, ' + (z ? z.$val : 0)
      }
    }
  }),

  $y: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var x = element.$x
        var z = element.$z

        if(!util.isNumber(val)) {
          val = 0
        }

        element.$translate3d.$val = (x ? x.$val : 0) + 'px, '+  val +  'px, ' + (z ? z.$val : 0)
      }
    }
  }),

  $z: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var x = element.$x
        var y = element.$y

        if(!util.isNumber(val)) {
          val = 0
        }

        element.$translate3d.$val = (x ? x.$val : 0) + 'px, '+  (y ? y.$val : 0) +  'px, ' + val
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
        var val = this.$val
        var element = this.$parent
        var node = element.$node


        if(util.isNumber(val)) {
          this.$val = val + 'deg'
        } else {
          val = 0
        }

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
        var skewY = element.$skewY

        if(!util.isNumber(val)) {
          val = 0
        }

        element.$skew.$val = val + 'deg, ' + (skewY ? skewY.$val : 0) + 'deg'
      }
    }
  }),

  $skewY: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var skewX = element.$skewX

        if(!util.isNumber(val)) {
          val = 0
        }

        element.$skew.$val = (skewX ? skewX.$val : 0) + 'deg, ' +  val + 'deg'
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
        var val = this.$val
        var element = this.$parent
        var scaleY = element.$scaleY

        if(!util.isNumber(val)) {
          val = 0
        }

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

        if(!util.isNumber(val)) {
          val = 0
        }

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