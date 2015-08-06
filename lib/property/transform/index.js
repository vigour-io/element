"use strict";

var Property = require('../')
var util = require('vjs/lib/util')
var ua = require('../../ua')
var mixins = require( '../../mixins' )
var joinTransforms = require( './joinTransforms' )

// exports.extended = function(){
//   return module.exports = require('./extended')
// }

exports.$flags = {

  /**
   * This is the shortcut for css `translateX()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $x: 400
   * })
   *
   */
  $x: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var x = removed ? 0 : this.$val
        var y = element.$y ? element.$y.$val : 0
        var z = element.$z ? element.$z.$val : 0

        element.set({
          $translate3d: mixins.translate3d(x, y, z)
        })
      }
    }
  }),

  /**
   * This is the shortcut for css `translateY()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $y: 400
   * })
   *
   */
  $y: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent

        var x = element.$x ? element.$x.$val : 0
        var y = this.$val
        var z = element.$z ? element.$z.$val : 0

        console.error('!!!!',y)

        element.set({
          $translate3d: mixins.translate3d(x, y, z)
        })
      }
    }
  }),

  /**
   * This is the shortcut for css `translate3d()` transform
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $translate3d: '400px, 100px, 15px'
   * })
   *
   */
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


  /**
   * This is the shortcut for css `opacity` property
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $opacity: 0.5
   * })
   *
   */
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

  /**
   * This is the shortcut for css `translateZ()` transform,
   * but is applies as {@link Property.$translate3d}
   * @type {number}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $z: 15
   * })
   */
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

  /**
   * This is the shortcut for css `translate()` transform
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $translate: '100px, 200px'
   * })
   */
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

  /**
   * This is the shortcut for css `rotate()` transform
   * @type {string}
   * @memberOf Property
   * @todo it must get number instead of string
   *
   * @example
   * var a = new Element({
   *   $rotate: '30deg'
   * })
   */
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

  /**
   * This is the shortcut for css `skewX()` transform
   * but is applies as {@link Property.$skew}
   * @type number
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $skewX: 10
   * })
   */
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

  /**
   * This is the shortcut for css `skewY()` transform
   * but is applies as {@link Property.$skew}
   * @type number
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $skewY: 12
   * })
   */
  $skewY: new Property({
    $on: {
      $change: function( event, removed ) {
        var element = this.$parent
        var skewX = element.$skewX ? element.$skewX.$val : 0
        var skewY = this.$val

        element.set({
          $skew: mixins.skew(skewX, skewY)
        })
      }
    }
  }),

  /**
   * This is the shortcut for css `skew()` transform
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $skew: '20deg, 30deg'
   * })
   *
   */
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

  /**
   * This is the shortcut for css `scaleX()` transform
   * but is applies as {@link Property.$scale}
   * @type number
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $scaleX: 1.4
   * })
   */
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

  /**
   * This is the shortcut for css `scaleY()` transform
   * but is applies as {@link Property.$scale}
   * @type number
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $scaleY: 1.2
   * })
   */
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

  /**
   * This is the shortcut for css `scale()` transform
   * @type {string}
   * @memberOf Property
   *
   * @example
   * var a = new Element({
   *   $scale: '1.2, 1.5'
   * })
   *
   */
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

  /**
   * This is the shortcut for css `transform-origin` property
   * @type {string}
   * @memberOf Property
   * @todo it must get multiple integer parameters
   *
   * @example
   * var a = new Element({
   *   $transformOrigin: '10px 50% 0'
   * })
   */
  $transformOrigin: new Property({
    $on: {
      $change: function( event, removed ) {
        var val = this.$val
        var element = this.$parent
        var node = element.$node

        // node.style.transformOrigin = mixins.transformOrigin(val)
        node.style.transformOrigin = val
      }
    }
  })

}